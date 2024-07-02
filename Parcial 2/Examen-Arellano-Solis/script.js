document.addEventListener('DOMContentLoaded', function () {
    const welcomeContainer = document.getElementById('welcome-container');
    const examContainer = document.getElementById('exam-container');
    const questionContainer = document.getElementById('question-container');
    const timerContainer = document.getElementById('timer-container');
    const timerElement = document.getElementById('timer');
    const startButton = document.getElementById('start-btn');
    const nextButton = document.getElementById('next-btn');
    const homeButton = document.getElementById('home-btn');
    const usernameInput = document.getElementById('username');
    let currentQuestionIndex = 0;
    let questions = [];
    let score = 0;
    let timer;
    let username = '';

    startButton.addEventListener('click', async function () {
        username = usernameInput.value.trim();
        if (username === '') {
            document.getElementById('username-alert').style.display = 'block';
            return;
        }
        welcomeContainer.style.display = 'none';
        examContainer.style.display = 'block';
        await fetchQuestions();
        startQuiz();
    });

    function startQuiz() {
        resetQuizUI();
        showQuestion(questions[currentQuestionIndex]);
    }

    function showQuestion(question) {
        const answers = shuffle([
            question.RespuestaCorrecta,
            question.RespuestaIncorrecta1,
            question.RespuestaIncorrecta2,
            question.RespuestaIncorrecta3
        ]);
    
        const answersHtml = answers.map(answer => `<li>${answer}</li>`).join('');
    
        questionContainer.innerHTML = `
            <h3>${question.Enunciado}</h3>
            <ul>${answersHtml}</ul>
        `;
        nextButton.style.display = 'none';
        document.getElementById('timeout-alert').style.display = 'none';
        timerContainer.style.display = 'block'; 
    
        const listItems = questionContainer.querySelectorAll('li');
        listItems.forEach(item => {
            item.addEventListener('click', function () {
                if (!item.classList.contains('disabled')) {
                    stopTimer(); 
                    timerContainer.style.display = 'none'; 
    
                    listItems.forEach(li => li.classList.remove('selected'));
                    item.classList.add('selected');
                    nextButton.style.display = 'block';
    
                    if (item.textContent === question.RespuestaCorrecta) {
                        item.classList.add('correct');
                        item.innerHTML += ' ✔';
                        score++;
                    } else {
                        item.classList.add('incorrect');
                        item.innerHTML += ' ✖';
                        listItems.forEach(li => {
                            if (li.textContent === question.RespuestaCorrecta) {
                                li.classList.add('correct');
                                li.innerHTML += ' ✔';
                            }
                        });
                    }
    
                    listItems.forEach(li => li.classList.add('disabled'));
                }
            });
        });

        startTimer(); 
    }
    
    function startTimer() {
        let timeLeft = 15;
        timerElement.textContent = timeLeft;
    
        stopTimer(); 
    
        timer = setInterval(function () {
            if (timeLeft > 0) {
                timeLeft--;
                timerElement.textContent = timeLeft;
            } else {
                stopTimer(); 
                markUnanswered();
                nextButton.style.display = 'block';
                document.getElementById('timeout-alert').style.display = 'block';
                timerContainer.style.display = 'none'; 
            }
        }, 1000);
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null; 
        }
    }

    nextButton.addEventListener('click', function () {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            resetQuizUI();
            showQuestion(questions[currentQuestionIndex]);
        } else {
            endQuiz();
        }
    });

    function markUnanswered() {
        const listItems = questionContainer.querySelectorAll('li');
        listItems.forEach(li => li.classList.add('disabled'));
        listItems.forEach(li => {
            if (li.textContent === questions[currentQuestionIndex].RespuestaCorrecta) {
                li.classList.add('correct');
                li.innerHTML += ' ✔';
            }
        });
    }

    function endQuiz() {
        questionContainer.innerHTML = '';
        timerContainer.style.display = 'none';

        let message = getMessage(score);

        document.getElementById('result-heading').textContent = 'Examen completado';
        document.getElementById('final-score').textContent = `Puntuación: ${score}`;
        document.getElementById('final-message').textContent = `¡Hola ${username}! ${message}`;

        nextButton.style.display = 'none';
        document.getElementById('result-container').style.display = 'block';
    }

    homeButton.addEventListener('click', function () {
        location.href = '/';
    });

    function getMessage(score) {
        let message = '';

        if (score >= 8) {
            message = `¡Felicidades! Has obtenido una puntuación excelente de ${score} sobre 10.`;
        } else if (score >= 5) {
            message = `¡Buen trabajo! Has obtenido una puntuación aceptable de ${score} sobre 10.`;
        } else {
            message = `Lo siento, no has obtenido una puntuación suficiente. Has obtenido ${score} sobre 10. ¡Sigue practicando!`;
        }

        return message;
    }

    function resetQuizUI() {
        questionContainer.innerHTML = '';
        nextButton.style.display = 'none';
        document.getElementById('timeout-alert').style.display = 'none';
        stopTimer();
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    async function fetchQuestions() {
        try {
            const response = await fetch('/api/questions'); // Debes ajustar la ruta según tu configuración de servidor
            if (!response.ok) {
                throw new Error('Error al obtener las preguntas');
            }
            questions = await response.json();
            console.log('Preguntas cargadas:', questions);
        } catch (error) {
            console.error('Error al cargar las preguntas', error);
            document.getElementById('question-error-alert').style.display = 'block';
        }
    }
});    
