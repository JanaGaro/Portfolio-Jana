var careerEvents = [{
    date: 'Q1 - 2017',
    content: 'Lorem ipsum dolor sit amet'
}, {
    date: 'Q2 - 2017',
    content: 'Lorem ipsum dolor sit amet'
}, {
    date: 'Q3 - 2017',
    content: 'Lorem ipsum dolor sit amet'
},
    {
        date: 'Q3 - 2018',
        content: 'Lorem ipsum dolor sit amet'
    }
];

var educationEvents = [{
    date: 'Q1 - 2017',
    content: 'Lorem ipsum dolor sit amet'
}, {
    date: 'Q2 - 2017',
    content: 'Lorem ipsum dolor sit amet'
}, {
    date: 'Q3 - 2017',
    content: 'Lorem ipsum dolor sit amet'
},
    {
        date: 'Q3 - 2018',
        content: 'Lorem ipsum dolor sit amet'
    }
];

$('#career-timeline').roadmap(careerEvents, {
    eventsPerSlide: 4
});

$('#education-timeline').roadmap(educationEvents, {
    eventsPerSlide: 4
});