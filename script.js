$(document).ready(function () {
    // Quiz Data
    const quizData = [
        {
            question: "What does HTML stand for?",
            options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Text Multiple Language", "Hyper Tool Multi Language"],
            correct: 1
        },
        {
            question: "Which language is used for styling web pages?",
            options: ["HTML", "JQuery", "CSS", "XML"],
            correct: 2
        },
        {
            question: "Which is not a JavaScript Framework?",
            options: ["Python Script", "JQuery", "Django", "NodeJS"],
            correct: 2 // Django is a Python framework
        },
        {
            question: "What symbol is used to select elements by ID in jQuery?",
            options: ["#", ".", "$", "@"],
            correct: 0
        },
        {
            question: "Which method performs an asynchronous HTTP request in jQuery?",
            options: ["$.ajax()", "$.query()", "$.http()", "$.send()"],
            correct: 0
        },
        {
            question: "What does CSS stand for?",
            options: ["Colorful Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets"],
            correct: 2
        },
        {
            question: "Which HTML tag is used to define an internal style sheet?",
            options: ["&lt;script&gt;", "&lt;style&gt;", "&lt;css&gt;", "&lt;link&gt;"],
            correct: 1
        },
        {
            question: "Which jQuery method is used to hide selected elements?",
            options: ["visible(false)", "hidden()", "hide()", "display(none)"],
            correct: 2
        },
        {
            question: "How do you write 'Hello World' in an alert box in JavaScript?",
            options: ["msg('Hello World');", "alertBox('Hello World');", "msgBox('Hello World');", "alert('Hello World');"],
            correct: 3
        },
        {
            question: "Which sign does jQuery use as a shortcut for jQuery?",
            options: ["%", "&", "$", "?"],
            correct: 2
        }
    ];

    // State Variables
    let currentQuestionIndex = 0;
    let userAnswers = new Array(quizData.length).fill(null); // Store selected indices

    // UI Elements
    const $quizContainer = $('#quiz-container');
    const $resultContainer = $('#result-container');
    const $questionText = $('#question-text');
    const $optionsContainer = $('#options-container');
    const $questionNumber = $('#question-number');
    const $nextBtn = $('#next-btn');
    const $prevBtn = $('#prev-btn');
    const $restartBtn = $('#restart-btn');

    // Initialize Quiz
    loadQuestion(currentQuestionIndex);

    // Load Question Function
    function loadQuestion(index) {
        const question = quizData[index];

        // Update Question Number
        $questionNumber.text(`Question ${index + 1} of ${quizData.length}`);

        // Fade out implementation for smooth transition
        $quizContainer.find('#question-area').fadeOut(200, function () {
            // Set Question Text
            $questionText.text(question.question);

            // Clear and Generate Options
            $optionsContainer.empty();
            question.options.forEach((option, i) => {
                const isChecked = userAnswers[index] === i ? 'checked' : '';
                const activeClass = userAnswers[index] === i ? 'selected' : '';

                const optionHtml = `
                    <label class="option-label ${activeClass}">
                        <input type="radio" name="option" value="${i}" ${isChecked}>
                        ${option}
                    </label>
                `;
                $optionsContainer.append(optionHtml);
            });

            // Fade in
            $(this).fadeIn(300);
        });

        // Update Button States
        if (index === 0) {
            $prevBtn.prop('disabled', true);
        } else {
            $prevBtn.prop('disabled', false);
        }

        if (index === quizData.length - 1) {
            $nextBtn.text('Finish');
        } else {
            $nextBtn.text('Next');
        }
    }

    // Option Selection Style Handling
    $(document).on('change', 'input[name="option"]', function () {
        $('.option-label').removeClass('selected');
        $(this).closest('label').addClass('selected');
    });

    // Next Button Click
    $nextBtn.click(function () {
        const selectedOption = $('input[name="option"]:checked').val();

        // Validation: Verify if an option is selected
        if (selectedOption === undefined) {
            alert('Please select an answer before proceeding!');
            return;
        }

        // Save Answer
        userAnswers[currentQuestionIndex] = parseInt(selectedOption);

        // Move to next question or show results
        if (currentQuestionIndex < quizData.length - 1) {
            currentQuestionIndex++;
            loadQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    });

    // Previous Button Click
    $prevBtn.click(function () {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            loadQuestion(currentQuestionIndex);
        }
    });

    // Show Results
    function showResults() {
        let score = 0;
        quizData.forEach((question, index) => {
            if (userAnswers[index] === question.correct) {
                score += 2; // 2 marks per correct answer
            }
        });

        $('#score-text').text(score);
        $('#total-text').text(quizData.length * 2);

        // Optional Feedback
        const percentage = (score / (quizData.length * 2)) * 100;
        let feedback = "";
        if (percentage === 100) feedback = "Excellent! Perfect Score!";

        else if (percentage >= 70) feedback = "Great job! You know your stuff.";
        else if (percentage >= 50) feedback = "Good effort, but you can do better.";
        else feedback = "Keep practicing!";

        $('#feedback-message').text(feedback);

        $quizContainer.addClass('hidden');
        $resultContainer.removeClass('hidden').hide().fadeIn(500);
    }

    // Restart Quiz
    $restartBtn.click(function () {
        currentQuestionIndex = 0;
        userAnswers = new Array(quizData.length).fill(null);

        $resultContainer.addClass('hidden');
        $quizContainer.removeClass('hidden');

        loadQuestion(currentQuestionIndex);
    });
});
