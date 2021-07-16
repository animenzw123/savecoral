var init={'questions':[{'question':'What is a polyp？','answers':['A protrusion from the reef','a single coral','Digestive gland of the coral','None of above'],'correctAnswer':2,'explain':'A polyp is an individual coral','qimg':'quizImages/q1.jpg'},{'question':'How do humans damage coral reefs?','answers':['Pollution','Overfishing','Touching ','All of the above'],'correctAnswer':4,'explain':'Human impact on coral reefs is significant. Damaging activities include coral mining, pollution, touching them, overfishing, blast fishing, the digging of canals and access into islands and bays.','qimg':'quizImages/q2.png'},{'question':'How does a coral reef contribute to the environment?','answers':['It buffets the coastal areas from storms and powerful waves.','It benefits the tourist trade','They protect smaller fish from sharks and other predators'],'correctAnswer':1,'explain':'The reef could buffet coastal regions from powerful waves and storms','qimg':'quizImages/q3.jpg'},{'question':'What do polyps eat？','answers':['Plankton','Fish','Crustaceans','Seaweed'],'correctAnswer':1,'explain':'Most soft corals depend almost exclusively on plankton for their nutritional needs.','qimg':'quizImages/q4.jpg'},{'question':'How much of the coral reef ecosystem will be destroyed by year 2050?','answers':['A half','two-third','Almost all of them','Zero'],'correctAnswer':3,'explain':'Even if the world could halt global warming now, scientists still expect that more than 90 percent of corals will die by 2050.','qimg':'quizImages/q5.jpg'},{'question':'Is the coral a plant?','answers':['It is a living creature.','It is a sophisticated fish-eating plant. ','It defies precise definition because of its unique nature.'],'correctAnswer':1,'explain':'The coral, although it is fixed to one spot, is a living creature.','qimg':'quizImages/q6.jpg'}]};

$(function(){
    $('#quiz-container').jquizzy({
        questions: init.questions
    });
});

(function($) {
    $.fn.jquizzy = function(settings) {
        var defaults = {
            questions: null,
            startImg: 'quizImages/start.png',
            endText: 'Quiz completed!',
            arrowR:'quizImages/AR.png',
            arrowL:'quizImages/AL.png',
            submitBT:'quizImages/submit.jpg',


            shortURL: null,
            sendResultsURL: null,
            resultComments: {
                perfect: 'You are a little genius!',
                excellent: 'Excellent!',
                good: 'Well done!',
                average: 'Just so so...',
                bad: 'Try again!',
                poor: 'Uh-oh！',
                worst: 'Oh！No！'
            }
        };
        var config = $.extend(defaults, settings);
        if (config.questions === null) {
            $(this).html('<div class="intro-container slide-container"><h2 class="qTitle">Failed to parse questions.</h2></div>');
            return;
        }
        var superContainer = $(this),
            answers = [],
            introFob = '<div class="intro-container slide-container"><h1 class="intro-text">Take a quiz of coral knowledge<br><br>See what do you know</h1><a class="nav-start" href="#"><br/><span><img src="'+config.startImg+'"></span></a></div>	',
            exitFob = '<div class="results-container slide-container"><div class="question-number">' + config.endText + '</div><div class="result-keeper"></div></div><br><br><div class="notice"><p class="warning">Pick an answer please~</p></div><div class="progress-keeper" ><div class="progress"></div></div>',
            contentFob = '',
            questionsIteratorIndex,
            answersIteratorIndex;
        superContainer.addClass('main-quiz-holder');
        for (questionsIteratorIndex = 0; questionsIteratorIndex < config.questions.length; questionsIteratorIndex++) {
            contentFob += '<div class="slide-container"><div class="question-number">' + (questionsIteratorIndex + 1) + '/' + config.questions.length + '</div><div class="question">' + config.questions[questionsIteratorIndex].question + '</div><div class="row"><div class="col-md-7 col-sm-7 game-frame"><ul class="answers">';
            for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[questionsIteratorIndex].answers.length; answersIteratorIndex++) {
                contentFob += '<li>' + config.questions[questionsIteratorIndex].answers[answersIteratorIndex] + '</li>';
            }
            contentFob += '</ul></div><div class="col-md-5 col-sm-5 game-frame"><img src="'+config.questions[questionsIteratorIndex].qimg+'"></div></div> <div class="nav-container">';
            if (questionsIteratorIndex !== 0) {
                contentFob += '<div class="prev"><a class="nav-previous" href="#">Previous</a></div>';
            }
            if (questionsIteratorIndex < config.questions.length - 1) {
                contentFob += '<div class="next"><a class="nav-next" href="#">Next</a></div>';
            } else {
                contentFob += '<div class="next final"><a class="nav-show-result" href="#">Submit</a></div>';
            }
            contentFob += '</div></div>';
            answers.push(config.questions[questionsIteratorIndex].correctAnswer);
        }
        superContainer.html(introFob + contentFob + exitFob);
        var progress = superContainer.find('.progress'),
            progressKeeper = superContainer.find('.progress-keeper'),
            notice = superContainer.find('.notice'),
            progressWidth = progressKeeper.width(),
            userAnswers = [],
            questionLength = config.questions.length,
            slidesList = superContainer.find('.slide-container');
        function checkAnswers() {
            var resultArr = [],
                flag = false;
            for (i = 0; i < answers.length; i++) {
                if (answers[i] == userAnswers[i]) {
                    flag = true;
                } else {
                    flag = false;
                }
                resultArr.push(flag);
            }
            return resultArr;
        }
        function roundReloaded(num, dec) {
            var result = Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
            return result;
        }
        function judgeSkills(score) {
            var returnString;
            if (score === 100) return config.resultComments.perfect;
            else if (score > 90) return config.resultComments.excellent;
            else if (score > 70) return config.resultComments.good;
            else if (score > 50) return config.resultComments.average;
            else if (score > 35) return config.resultComments.bad;
            else if (score > 20) return config.resultComments.poor;
            else return config.resultComments.worst;
        }
        progressKeeper.hide();
        notice.hide();
        slidesList.hide().first().fadeIn(500);
        superContainer.find('li').click(function() {
            var thisLi = $(this);
            if (thisLi.hasClass('selected')) {
                thisLi.removeClass('selected');
            } else {
                thisLi.parents('.answers').children('li').removeClass('selected');
                thisLi.addClass('selected');
            }
        });
        superContainer.find('.nav-start').click(function() {
            $(this).parents('.slide-container').fadeOut(500,
                function() {
                    $(this).next().fadeIn(500);
                    progressKeeper.fadeIn(500);
                });
            return false;
        });
        superContainer.find('.next').click(function() {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500,
                function() {
                    $(this).next().fadeIn(500);
                });
            progress.animate({
                    width: progress.width() + Math.round(progressWidth / questionLength)
                },
                500);
            return false;
        });
        superContainer.find('.prev').click(function() {
            notice.hide();
            $(this).parents('.slide-container').fadeOut(500,
                function() {
                    $(this).prev().fadeIn(500);
                });
            progress.animate({
                    width: progress.width() - Math.round(progressWidth / questionLength)
                },
                500);
            return false;
        });
        superContainer.find('.final').click(function() {
            if ($(this).parents('.slide-container').find('li.selected').length === 0) {
                notice.fadeIn(300);
                return false;
            }
            superContainer.find('li.selected').each(function(index) {
                userAnswers.push($(this).parents('.answers').children('li').index($(this).parents('.answers').find('li.selected')) + 1);
            });
            if (config.sendResultsURL !== null) {
                var collate = [];
                for (r = 0; r < userAnswers.length; r++) {
                    collate.push('{"questionNumber":"' + parseInt(r + 1, 10) + '", "userAnswer":"' + userAnswers[r] + '"}');
                }
                $.ajax({
                    type: 'POST',
                    url: config.sendResultsURL,
                    data: '{"answers": [' + collate.join(",") + ']}',
                    complete: function() {
                        console.log("OH HAI");
                    }
                });
            }
            progressKeeper.hide();
            var results = checkAnswers(),
                resultSet = '',
                trueCount = 0,
                shareButton = '',
                score,
                url;
            if (config.shortURL === null) {
                config.shortURL = window.location
            };
            for (var i = 0,
                     toLoopTill = results.length; i < toLoopTill; i++) {
                if (results[i] === true) {
                    trueCount++;
                    isCorrect = true;
                }
                resultSet += '<div class="result-row">' + (results[i] === true ? "<div class='correct'>NO."+(i + 1)+"<span></span></div>": "<div class='wrong'>NO."+(i + 1)+"<span></span></div>");
                resultSet += '<div class="resultsview-qhover">' + config.questions[i].question;
                resultSet += "<ul>";
                for (answersIteratorIndex = 0; answersIteratorIndex < config.questions[i].answers.length; answersIteratorIndex++) {
                    var classestoAdd = '';
                    if (config.questions[i].correctAnswer == answersIteratorIndex + 1) {
                        classestoAdd += 'right';
                    }
                    if (userAnswers[i] == answersIteratorIndex + 1) {
                        classestoAdd += ' selected';
                    }
                    resultSet += '<li class="' + classestoAdd + '">' + config.questions[i].answers[answersIteratorIndex] + '</li>';
                }
                resultSet += '</ul> <div class="separ"></div> <div class="explain">'+ config.questions[i].explain+'</div> </div></div>';
            }
            score = roundReloaded(trueCount / questionLength * 100, 2);

            resultSet = '<h2 class="qTitle">' + judgeSkills(score) + '<br/> You get： ' + score + '<br><br> Select results below to see why <br></h2>' + shareButton + '<div class="jquizzy-clear"></div>' + resultSet + '<div class="jquizzy-clear"></div>';
            superContainer.find('.result-keeper').html(resultSet).show(500);
            superContainer.find('.resultsview-qhover').hide();
            superContainer.find('.result-row').hover(function() {
                    $(this).find('.resultsview-qhover').show();
                },
                function() {
                    $(this).find('.resultsview-qhover').hide();
                });
            $(this).parents('.slide-container').fadeOut(500,
                function() {
                    $(this).next().fadeIn(500);
                });
            return false;
        });
    };
})(jQuery);