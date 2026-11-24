(function () {
  "use strict";

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function feedback(container, correct, explanation) {
    let message = container.querySelector(".feedback");
    if (!message) { message = element("p", "feedback"); message.setAttribute("role", "status"); container.append(message); }
    message.className = `feedback ${correct ? "correct" : "incorrect"}`;
    message.textContent = correct ? "Correct." : "Not quite. Try again.";
    if (correct && explanation) message.append(element("span", "", explanation));
  }

  function checkButton(onCheck) {
    const button = element("button", "button", "Check answer");
    button.type = "button";
    button.addEventListener("click", onCheck);
    return button;
  }

  function renderChoice(activity, container, choices, correctIndex, lessonId, lessonVersion) {
    const fieldset = element("fieldset");
    fieldset.append(element("legend", "", activity.question));
    choices.forEach((choice, index) => {
      const label = element("label", "option");
      const input = element("input");
      input.type = "radio"; input.name = activity.id; input.value = String(index);
      label.append(input, document.createTextNode(choice)); fieldset.append(label);
    });
    container.append(fieldset);
    container.append(checkButton(() => {
      const selected = fieldset.querySelector("input:checked");
      if (!selected) { feedback(container, false); return; }
      const correct = Number(selected.value) === correctIndex;
      if (correct) Progress.completeActivity(activity.id, lessonId, lessonVersion);
      feedback(container, correct, activity.explanation);
      if (correct) container.dispatchEvent(new CustomEvent("activitycomplete", { bubbles: true }));
    }));
  }

  function renderFill(activity, container, lessonId, lessonVersion) {
    const label = element("label", "question", activity.question);
    const input = element("input", "text-answer");
    input.type = "text"; input.id = `${activity.id}-answer`; input.autocomplete = "off";
    label.htmlFor = input.id;
    const normalise = value => value.trim().replace(/\s+/g, " ").toLocaleLowerCase("en-GB");
    container.append(label, input);
    const check = () => {
      const correct = activity.acceptedAnswers.some(answer => normalise(answer) === normalise(input.value));
      if (correct) Progress.completeActivity(activity.id, lessonId, lessonVersion);
      feedback(container, correct, activity.explanation);
      if (correct) container.dispatchEvent(new CustomEvent("activitycomplete", { bubbles: true }));
    };
    container.append(checkButton(check));
    input.addEventListener("keydown", event => { if (event.key === "Enter") check(); });
  }

  function renderOrdering(activity, container, lessonId, lessonVersion) {
    const question = element("p", "question", activity.question);
    const list = element("ol", "ordering-list");
    activity.items.forEach(item => {
      const row = element("li", "ordering-item"); row.dataset.id = item.id;
      row.append(element("span", "", item.text));
      const up = element("button", "button button-secondary button-small", "Up"); up.type = "button"; up.setAttribute("aria-label", `Move ${item.text} up`);
      const down = element("button", "button button-secondary button-small", "Down"); down.type = "button"; down.setAttribute("aria-label", `Move ${item.text} down`);
      up.addEventListener("click", () => { const previous = row.previousElementSibling; if (previous) { list.insertBefore(row, previous); row.focus(); } });
      down.addEventListener("click", () => { const next = row.nextElementSibling; if (next) { list.insertBefore(next, row); row.focus(); } });
      row.tabIndex = -1; row.append(up, down); list.append(row);
    });
    container.append(question, list);
    container.append(checkButton(() => {
      const answer = Array.from(list.children, item => item.dataset.id);
      const correct = answer.every((id, index) => id === activity.correctOrder[index]);
      if (correct) Progress.completeActivity(activity.id, lessonId, lessonVersion);
      feedback(container, correct, activity.explanation);
      if (correct) container.dispatchEvent(new CustomEvent("activitycomplete", { bubbles: true }));
    }));
  }

  function render(activity, lessonId, lessonVersion) {
    const container = element("section", "activity");
    container.dataset.activityId = activity.id;
    const typeLabel = ({ "multiple-choice": "Multiple choice", "true-false": "True or false", "fill-blank": "Fill in the blank", ordering: "Put in order" })[activity.type];
    container.append(element("p", "eyebrow", typeLabel));
    if (activity.type === "multiple-choice") renderChoice(activity, container, activity.options, activity.correctIndex, lessonId, lessonVersion);
    else if (activity.type === "true-false") renderChoice(activity, container, ["True", "False"], activity.correct ? 0 : 1, lessonId, lessonVersion);
    else if (activity.type === "fill-blank") renderFill(activity, container, lessonId, lessonVersion);
    else if (activity.type === "ordering") renderOrdering(activity, container, lessonId, lessonVersion);
    if (Progress.isActivityComplete(activity.id, lessonVersion)) feedback(container, true, activity.explanation);
    return container;
  }

  window.Activities = { render };
}());
