/* ===================================================================
   Operator Trainer
   An adaptive trainer for comparison operators & numerical reasoning.

   Architecture
   ------------
   1. CONCEPTS       — each comparison "idea" is a concept with a generator
                       that builds a fresh question instance per difficulty.
   2. Spaced repetition (Leitner boxes) — wrong answers drop to box 1 and
                       reappear almost immediately; correct answers get
                       promoted and spaced further out. Progress persists
                       in localStorage so mastery carries across sessions.
   3. Explanations   — every answer produces a clear, English explanation
                       of *why* the statement is true or false.
   4. Feedback/UX    — animated correct/incorrect states, confetti, timer
                       pressure on medium/hard, smooth question transitions.
   =================================================================== */

(function () {
    "use strict";

    /* ── Small helpers ───────────────────────────────────────────── */
    const $ = (sel) => document.querySelector(sel);
    const rand = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
    const coin = (p = 0.5) => Math.random() < p;

    const OP_WORD = {
        "<":  "less than",
        ">":  "greater than",
        "==": "equal to",
        "<=": "less than or equal to",
        ">=": "greater than or equal to",
        "!=": "not equal to",
    };

    const OP_FN = {
        "<":  (a, b) => a < b,
        ">":  (a, b) => a > b,
        "==": (a, b) => a === b,
        "<=": (a, b) => a <= b,
        ">=": (a, b) => a >= b,
        "!=": (a, b) => a !== b,
    };

    /* Range of operands per difficulty. */
    const RANGE = {
        easy:   { min: 0, max: 20 },
        medium: { min: 0, max: 1000 },
        hard:   { min: -1000, max: 1000 },
    };

    /* Seconds allowed per question (0 = no timer). */
    const TIME_LIMIT = { easy: 0, medium: 12, hard: 8 };

    /* ── Concept definitions ─────────────────────────────────────────
       Each concept knows which difficulties it appears in and how to
       generate a question for a given difficulty. A generated question:
         { aDisplay, bDisplay, aVal, bVal, op, isTrue, note }
       `note` is an optional concept-specific teaching nugget.
    ──────────────────────────────────────────────────────────────── */

    /* Generate two numbers in a difficulty's range, biased so that the
       chosen operator is roughly 50/50 true vs false, and so boundary
       (equal) cases appear often for operators that hinge on them.       */
    function basicQuestion(op, diff, { equalBias = 0.25 } = {}) {
        const r = RANGE[diff];
        let a = rand(r.min, r.max);
        let b;
        if (coin(equalBias)) {
            b = a; // boundary / equality case
        } else {
            b = rand(r.min, r.max);
        }
        return finalize({ aVal: a, bVal: b, op });
    }

    function finalize(q) {
        return {
            aDisplay: String(q.aDisplay ?? q.aVal),
            bDisplay: String(q.bDisplay ?? q.bVal),
            aVal: q.aVal,
            bVal: q.bVal,
            op: q.op,
            isTrue: OP_FN[q.op](q.aVal, q.bVal),
            note: q.note || "",
        };
    }

    const CONCEPTS = [
        {
            id: "less-than",
            name: "Less than  <",
            difficulties: ["easy", "medium", "hard"],
            generate: (d) => basicQuestion("<", d),
        },
        {
            id: "greater-than",
            name: "Greater than  >",
            difficulties: ["easy", "medium", "hard"],
            generate: (d) => basicQuestion(">", d),
        },
        {
            id: "equality",
            name: "Equality  ==",
            difficulties: ["easy", "medium", "hard"],
            // Higher equal bias so "true" cases actually occur.
            generate: (d) => basicQuestion("==", d, { equalBias: 0.45 }),
        },
        {
            id: "less-equal",
            name: "Less or equal  <=",
            difficulties: ["medium", "hard"],
            generate: (d) => basicQuestion("<=", d, { equalBias: 0.4 }),
        },
        {
            id: "greater-equal",
            name: "Greater or equal  >=",
            difficulties: ["medium", "hard"],
            generate: (d) => basicQuestion(">=", d, { equalBias: 0.4 }),
        },
        {
            id: "not-equal",
            name: "Not equal  !=",
            difficulties: ["medium", "hard"],
            generate: (d) => basicQuestion("!=", d, { equalBias: 0.4 }),
        },
        {
            id: "negatives",
            name: "Negative numbers",
            difficulties: ["hard"],
            generate: () => {
                const op = pick(["<", ">", "<=", ">="]);
                const a = rand(-999, -1);
                const b = coin(0.5) ? rand(-999, -1) : rand(0, 50);
                return finalize({
                    aVal: a, bVal: b, op,
                    note: "With negatives, the number closer to zero is the larger one: " +
                          "<code>-3 &gt; -10</code> because -3 sits to the right of -10 on the number line.",
                });
            },
        },
        {
            id: "float-precision",
            name: "Floating-point precision",
            difficulties: ["hard"],
            generate: () => {
                // Classic IEEE-754 traps where math looks exact but isn't.
                const cases = [
                    { a: 0.1 + 0.2, aD: "0.1 + 0.2", b: 0.3, bD: "0.3" },
                    { a: 0.1 + 0.1 + 0.1, aD: "0.1 + 0.1 + 0.1", b: 0.3, bD: "0.3" },
                    { a: 0.3 - 0.2, aD: "0.3 - 0.2", b: 0.1, bD: "0.1" },
                    { a: 1.005 * 100, aD: "1.005 * 100", b: 100.5, bD: "100.5" },
                ];
                const c = pick(cases);
                const op = pick(["==", "!="]);
                return finalize({
                    aVal: c.a, bVal: c.b, aDisplay: c.aD, bDisplay: c.bD, op,
                    note: "Decimals like 0.1 can't be stored exactly in binary floating point, " +
                          "so tiny rounding errors creep in. Never compare floats with " +
                          "<code>==</code>; check that the difference is within a small epsilon instead.",
                });
            },
        },
        {
            id: "hex-literal",
            name: "Hex & binary literals",
            difficulties: ["hard"],
            generate: () => {
                const useHex = coin(0.5);
                const val = rand(16, 511);
                const literal = useHex ? "0x" + val.toString(16).toUpperCase()
                                       : "0b" + val.toString(2);
                const op = pick(["<", ">", "==", "!="]);
                // Compare the literal against a nearby decimal.
                const dec = coin(0.5) ? val : val + pick([-1, 1, rand(2, 40)]);
                return finalize({
                    aVal: val, bVal: dec, aDisplay: literal, bDisplay: String(dec), op,
                    note: `<code>${literal}</code> is just another way of writing the decimal ` +
                          `<code>${val}</code> — the base only changes how it's written, not its value.`,
                });
            },
        },
    ];

    const CONCEPT_BY_ID = Object.fromEntries(CONCEPTS.map((c) => [c.id, c]));

    /* ── Persistent state (Leitner SR + stats + prefs) ───────────── */
    const STORE_KEY = "operator-trainer-v1";
    const BOX_INTERVAL = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 }; // rounds until due
    const MASTERED_BOX = 5;

    const defaultState = () => ({
        difficulty: "easy",
        round: 0,
        score: 0,
        streak: 0,
        bestStreak: 0,
        answered: 0,
        correct: 0,
        // concepts[id] = { box, due, seen, wrong }
        concepts: {},
    });

    let state = load();

    function load() {
        try {
            const raw = localStorage.getItem(STORE_KEY);
            if (raw) return Object.assign(defaultState(), JSON.parse(raw));
        } catch (e) { /* corrupt or unavailable storage — start fresh */ }
        return defaultState();
    }

    function save() {
        try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
        catch (e) { /* storage may be disabled; game still works in-memory */ }
    }

    function conceptState(id) {
        if (!state.concepts[id]) {
            state.concepts[id] = { box: 1, due: 0, seen: 0, wrong: 0 };
        }
        return state.concepts[id];
    }

    /* ── Spaced-repetition scheduler ─────────────────────────────────
       Among the concepts enabled for the current difficulty, choose the
       one most in need of practice: prefer items whose `due` round has
       arrived, breaking ties toward the lowest box (recently missed).
       If nothing is due yet, jump to the soonest-due item.             */
    function chooseConcept() {
        const pool = CONCEPTS.filter((c) => c.difficulties.includes(state.difficulty));
        const dueNow = pool.filter((c) => conceptState(c.id).due <= state.round);
        const candidates = dueNow.length ? dueNow : pool;

        candidates.sort((a, b) => {
            const ca = conceptState(a.id), cb = conceptState(b.id);
            if (ca.box !== cb.box) return ca.box - cb.box;   // weakest first
            return ca.due - cb.due;                          // then soonest due
        });

        // Add a little randomness among the top few so it doesn't feel robotic.
        const topBox = conceptState(candidates[0].id).box;
        const top = candidates.filter((c) => conceptState(c.id).box === topBox);
        return pick(top);
    }

    function schedule(id, wasCorrect) {
        const cs = conceptState(id);
        cs.seen++;
        if (wasCorrect) {
            cs.box = Math.min(MASTERED_BOX, cs.box + 1);
        } else {
            cs.box = 1;
            cs.wrong++;
        }
        cs.due = state.round + BOX_INTERVAL[cs.box];
    }

    /* ── Explanation builder ─────────────────────────────────────── */
    function buildExplanation(q, userSaidTrue) {
        const userCorrect = userSaidTrue === q.isTrue;
        const verdict = q.isTrue ? "TRUE" : "FALSE";
        const fmt = (v, d) => {
            // Show the resolved numeric value when the display differs (e.g. floats/hex).
            // String(v) gives the shortest round-trippable form: 0.1 + 0.2 reveals
            // 0.30000000000000004, while 0.3 stays a clean "0.3".
            const resolved = String(v);
            return d !== resolved ? `<code>${d}</code> (= ${resolved})` : `<code>${d}</code>`;
        };

        const relation = relationPhrase(q.aVal, q.bVal);
        let html =
            `The statement <code>${q.aDisplay} ${q.op} ${q.bDisplay}</code> asks: ` +
            `is ${fmt(q.aVal, q.aDisplay)} <strong>${OP_WORD[q.op]}</strong> ${fmt(q.bVal, q.bDisplay)}? ` +
            `In fact ${relation}, so the statement is <strong>${verdict}</strong>.`;

        if (q.note) {
            html += `<span class="tip">💡 ${q.note}</span>`;
        }
        return { html, userCorrect, verdict };
    }

    function relationPhrase(a, b) {
        if (a === b) return `both sides are equal (<code>${a} = ${b}</code>)`;
        if (a < b)   return `the left side is smaller (<code>${a} &lt; ${b}</code>)`;
        return `the left side is larger (<code>${a} &gt; ${b}</code>)`;
    }

    /* ── DOM references ──────────────────────────────────────────── */
    const el = {
        card: $("#card"),
        concept: $("#conceptTag"),
        a: $("#operandA"),
        op: $("#operator"),
        b: $("#operandB"),
        btnTrue: $("#btnTrue"),
        btnFalse: $("#btnFalse"),
        feedback: $("#feedback"),
        feedbackBadge: $("#feedbackBadge"),
        feedbackText: $("#feedbackText"),
        btnNext: $("#btnNext"),
        score: $("#statScore"),
        streak: $("#statStreak"),
        accuracy: $("#statAccuracy"),
        masteryCount: $("#masteryCount"),
        masteryFill: $("#masteryFill"),
        timerWrap: $("#timerWrap"),
        timerBar: $("#timerBar"),
        difficultyBtns: Array.from(document.querySelectorAll(".difficulty__btn")),
        reset: $("#btnReset"),
    };

    /* ── Runtime question state ──────────────────────────────────── */
    let current = null;       // { concept, question }
    let answered = false;     // guard against double-answers
    let timerId = null;

    /* ── Rendering ───────────────────────────────────────────────── */
    function renderStats() {
        bump(el.score, state.score);
        bump(el.streak, state.streak);
        const acc = state.answered ? Math.round((state.correct / state.answered) * 100) : 100;
        el.accuracy.textContent = acc + "%";
        renderMastery();
    }

    function bump(node, value) {
        if (node.textContent !== String(value)) {
            node.textContent = value;
            node.classList.remove("bump");
            void node.offsetWidth; // restart animation
            node.classList.add("bump");
        }
    }

    function renderMastery() {
        const pool = CONCEPTS.filter((c) => c.difficulties.includes(state.difficulty));
        const mastered = pool.filter((c) => conceptState(c.id).box >= MASTERED_BOX).length;
        el.masteryCount.textContent = `${mastered} / ${pool.length} mastered`;
        el.masteryFill.style.width = (pool.length ? (mastered / pool.length) * 100 : 0) + "%";
    }

    function renderDifficulty() {
        el.difficultyBtns.forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.difficulty === state.difficulty);
            btn.setAttribute("aria-selected", btn.dataset.difficulty === state.difficulty);
        });
    }

    function nextQuestion() {
        clearTimer();
        answered = false;
        const concept = chooseConcept();
        const question = concept.generate(state.difficulty);
        current = { concept, question };

        el.concept.textContent = concept.name;
        el.a.textContent = question.aDisplay;
        el.op.textContent = question.op;
        el.b.textContent = question.bDisplay;

        // Reset answer buttons
        [el.btnTrue, el.btnFalse].forEach((b) => {
            b.disabled = false;
            b.classList.remove("picked-correct", "picked-wrong", "reveal-correct");
        });

        // Hide feedback, animate card in
        el.feedback.hidden = true;
        el.card.classList.remove("correct", "wrong", "enter");
        void el.card.offsetWidth;
        el.card.classList.add("enter");

        startTimer();
    }

    /* ── Timer (medium / hard) ───────────────────────────────────── */
    function startTimer() {
        const limit = TIME_LIMIT[state.difficulty];
        if (!limit) { el.timerWrap.hidden = true; return; }

        el.timerWrap.hidden = false;
        const bar = el.timerBar;
        bar.classList.remove("run", "danger");
        bar.style.animation = "none";
        void bar.offsetWidth;
        bar.style.animationDuration = limit + "s";
        bar.classList.add("run");
        // Switch to a warning colour for the final stretch.
        setTimeout(() => { if (!answered) bar.classList.add("danger"); }, limit * 1000 * 0.6);

        timerId = setTimeout(() => handleAnswer(null), limit * 1000);
    }

    function clearTimer() {
        if (timerId) { clearTimeout(timerId); timerId = null; }
        el.timerBar.style.animation = "none";
    }

    /* ── Answer handling ─────────────────────────────────────────── */
    function handleAnswer(userSaidTrue) {
        if (answered || !current) return;
        answered = true;
        clearTimer();

        const { concept, question } = current;
        const timedOut = userSaidTrue === null;
        const userCorrect = !timedOut && userSaidTrue === question.isTrue;

        // ── Update stats & schedule ──
        state.round++;
        state.answered++;
        if (userCorrect) {
            state.correct++;
            state.score += 10 + Math.min(state.streak, 10); // streak bonus
            state.streak++;
            state.bestStreak = Math.max(state.bestStreak, state.streak);
        } else {
            state.streak = 0;
            state.score = Math.max(0, state.score - 5);
        }
        schedule(concept.id, userCorrect);
        save();

        // ── Visual feedback on buttons ──
        const trueBtn = el.btnTrue, falseBtn = el.btnFalse;
        trueBtn.disabled = true; falseBtn.disabled = true;
        const correctBtn = question.isTrue ? trueBtn : falseBtn;
        correctBtn.classList.add("reveal-correct");

        if (!timedOut) {
            const chosenBtn = userSaidTrue ? trueBtn : falseBtn;
            chosenBtn.classList.add(userCorrect ? "picked-correct" : "picked-wrong");
        }

        // ── Card animation + confetti ──
        el.card.classList.toggle("correct", userCorrect);
        el.card.classList.toggle("wrong", !userCorrect);
        if (userCorrect) burstConfetti();

        // ── Explanation ──
        const { html } = buildExplanation(question, userSaidTrue);
        el.feedback.classList.toggle("is-correct", userCorrect);
        el.feedback.classList.toggle("is-wrong", !userCorrect);
        el.feedbackBadge.textContent = userCorrect
            ? "✓ Correct"
            : (timedOut ? "⏱ Time's up" : "✕ Not quite");
        el.feedbackText.innerHTML = html;
        el.feedback.hidden = false;
        el.btnNext.focus();

        renderStats();
    }

    /* ── Confetti (lightweight, pure DOM) ────────────────────────── */
    function burstConfetti() {
        if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const colors = ["#6c8cff", "#8b6cff", "#25c98c", "#ffd166", "#ff5d73"];
        const rect = el.card.getBoundingClientRect();
        const originX = rect.left + rect.width / 2;
        const originY = rect.top + rect.height / 3;
        for (let i = 0; i < 18; i++) {
            const p = document.createElement("div");
            p.className = "confetti";
            p.style.background = pick(colors);
            p.style.left = originX + "px";
            p.style.top = originY + "px";
            p.style.setProperty("--dx", rand(-160, 160) + "px");
            p.style.setProperty("--dy", rand(40, 220) + "px");
            document.body.appendChild(p);
            setTimeout(() => p.remove(), 1000);
        }
    }

    /* ── Difficulty switching ────────────────────────────────────── */
    function setDifficulty(d) {
        if (state.difficulty === d) return;
        state.difficulty = d;
        save();
        renderDifficulty();
        nextQuestion();
        renderStats();
    }

    /* ── Reset ───────────────────────────────────────────────────── */
    function resetProgress() {
        const keep = state.difficulty;
        state = defaultState();
        state.difficulty = keep;
        save();
        renderDifficulty();
        nextQuestion();
        renderStats();
    }

    /* ── Wiring ──────────────────────────────────────────────────── */
    el.btnTrue.addEventListener("click", () => handleAnswer(true));
    el.btnFalse.addEventListener("click", () => handleAnswer(false));
    el.btnNext.addEventListener("click", nextQuestion);
    el.reset.addEventListener("click", resetProgress);
    el.difficultyBtns.forEach((btn) =>
        btn.addEventListener("click", () => setDifficulty(btn.dataset.difficulty)));

    // Keyboard shortcuts: T/← = true, F/→ = false, Enter/Space = next.
    document.addEventListener("keydown", (e) => {
        const k = e.key.toLowerCase();
        if (!answered) {
            if (k === "t" || k === "arrowleft")  { e.preventDefault(); handleAnswer(true); }
            else if (k === "f" || k === "arrowright") { e.preventDefault(); handleAnswer(false); }
        } else if (k === "enter" || k === " ") {
            e.preventDefault();
            nextQuestion();
        }
    });

    /* ── Boot ────────────────────────────────────────────────────── */
    renderDifficulty();
    renderStats();
    nextQuestion();
})();
