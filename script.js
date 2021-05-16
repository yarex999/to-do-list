$(document).ready(function() {

    let totalTasks = 0;
    let doneTasks = 0;
    let currentTasks = 0;

    let busyDays = [];
    let currentTasksArr = [];

    $('#toAdd').click(function() {
        
        if ($('#addTask').val() != 0 && $('#addDate').val() != 0) {
            // create a new task card
            $('#toAdd').toggleClass('is_active')
            $('.tasks').append('<div class="task"></div>');
            $('.task').last().append("<label class='task_label'></label>");
            $('.task_label').last().append("<input class='task_checkbox'>");
            $('.task_checkbox').last().attr('type', 'checkbox');
            $('.task').last().append("<p title='double click to change!' class='task_info'></p>");
            $('.task_info').last().text($('#addTask').val());
            $('.task').last().append("<div class='task_date'></div>");
            $('.task_date').last().text(convertDate($('#addDate').val()));
            currentTasksArr.push($('.task'));
            setTimeout(()=> $('#toAdd').toggleClass('is_active'), 2000)

            $('.task_info').last().dblclick(function() {
                let elem = $(this);
                let elemText = elem.text()
                elem.html(function() {
                    return '<input class="change_input">'
                });

                $('.change_input').val(function() {
                    return elemText
                });

                $('.change_input').keypress(function(e) {
                    if (e.keyCode == 13) {
                        elem.html(function() {
                            return $('.change_input').val()
                        });
                        this.remove();
                    }
                });

            })

            
            // add a function to a checkbox
            $('.task_checkbox').last().click(function() {
                setTimeout(() => {
                    $(this).parents('.task').remove();
                    doneTasks++;
                    updateBarChart(totalTasks, doneTasks);
                    updateCalendar();
                    if ($('.task').length == 0) {
                        totalTasks = doneTasks = currentTasks = 0;

                        $('.day').removeClass('active');
                        console.log(4)
                        alert('well done!');
                    }

                }, 2000)
                $(this).parent().css('background-color', '#26d0a9');

                let deleteDate = $(this).parent().nextAll().last();
                console.log(deleteDate.text());
                let deleteIndex = busyDays.indexOf(deleteDate.text());
                console.log(deleteIndex)
                busyDays.splice(deleteIndex, 1);
                

            })


            // converting date
            let taskDate = $('#addDate').val();
           
                let covertedDate = convertDate(taskDate);
                busyDays.push(covertedDate);
            

            $('#addTask').val('');
            $('#addDate').val('');
            totalTasks++
            updateBarChart(totalTasks, doneTasks);
            updateCalendar()
            sortingTasks()
        } else {
            alert('enter the data!')
        }
        
       
    })

    // Bar chart
    function updateBarChart(total, done) {
        currentTasks = total - done;
        currentTasksPercentage = (currentTasks / total) * 100;
        $('.bar_inner').width(currentTasksPercentage + '%');
    }
    // ------------------------------------------

    // show the day where there is a task
    function updateCalendar() {
        $('.day').each(function(i, elem) {
            if (busyDays.indexOf($(elem).text()) >= 0) {
                $(elem).addClass('busy_day');
            } else {
                $(elem).removeClass('busy_day');
                $(elem).removeClass('active');
                $('.task').show();
            }
        })
    }
    // ------------------------------------------

  

    // filterig tasks by day
    $('.day').click(function() {
        if(busyDays.length > 0 && $(this).hasClass('busy_day')){
         $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $('.day').not($(this)).removeClass('active');
            chooseTasks($(this))
        } else {
            $('.task').show()
        }   
        }
        
    })

    // open filtered tasks by day
    function chooseTasks(tab) {
        $('.task').each(function(i, elem) {
            ($(elem).children().last().text() == tab.text()) ?
            $(elem).show(): $(elem).hide()
        })
    }
    // ------------------------------------------
    // converting data into a proper format
    function convertDate(date) {
        let finalDate;
        let checkingDate = date.toLowerCase().trim();
        console.log(checkingDate);

        switch (checkingDate) {
            case '1':
            case 'm':
            case 'mon':
            case 'monday':
                finalDate = 'Mon';
                $('.task').last().attr('data-day', 'day1');
                break;
            case '2':
            case 't':
            case 'tue':
            case 'tues':
            case 'tuesday':
                finalDate = 'Tue';
                $('.task').last().attr('data-day', 'day2');

                break

            case '3':
            case 'w':
            case 'wed':
            case 'wednesday':
                finalDate = 'Wed';
                $('.task').last().attr('data-day', 'day3');
                break;
            case '4':
            case 'thu':
            case 'thurs':
            case 'thursday':
                finalDate = 'Thu';
                $('.task').last().attr('data-day', 'day4');
                break;
            case '5':
            case 'f':
            case 'fri':
            case 'friday':
                finalDate = 'Fri';
                $('.task').last().attr('data-day', 'day5');
                break;
            case '6':
            case 'sat':
            case 'saturday':
                finalDate = 'Sat';
                $('.task').last().attr('data-day', 'day6');
                break;
            case '7':
            case 'sun':
            case 'sunday':
                finalDate = 'Sun';
                $('.task').last().attr('data-day', 'day7');
                break;
            default:
                return alert('can`t find this day')
        }
        console.log(finalDate);
        return finalDate;
    }
    // ------------------------------------------

    // sorting
    function sortingTasks() {
        let arr = [];
        $('.task').each(function(i, elem) {
                arr.push($(elem).attr('data-day'));
                arr.sort();
            })
            // sorting process
        arr.forEach(elem => $('.task').each(function(i, elem1) {
            if ($(elem1).attr('data-day') == elem) {
                $(elem1).appendTo($('.tasks'))
            }
        }));
        console.log(arr);
        console.log(busyDays)
    }
    // ------------------------------------------

})