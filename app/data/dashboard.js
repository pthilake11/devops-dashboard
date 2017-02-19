var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

var bugsInstanceSchema = new mongoose.Schema({
    Id:{type:Number,  default: 0, unique:true},
    reportId: String,
    classId: String,
    methodName: String,
    sourceLine: {
        start: Number,
        end: Number
    },
    category: String,
    priority: String,
    SM: String,
    LM: String
});
bugsInstanceSchema.plugin(autoIncrement.plugin,
    {
        model:'bugsInstanceSchema',
        field: 'Id',
        startAt:1,
        incrementBy:1
    });

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
});


var coverage = new mongoose.Schema({
    Id:{type:Number,  default: 0, unique:true},
    APPID: String,
    REPORTID: String,
    REPORTNUMBER: Number,
    LASTUPDATED: String,
    TOTALLINES: String,
    LINESCOVERED: String,
    PACKAGES: [
        {
            NAME: String,
            CLASSES: [
                {
                NAME: String,
                METHODS: [
                    {
                        NAME: String,
                        LINES: [
                            {
                                NUMBER: Number,
                                HITS: Number,
                            }
                        ]
                    }

                ]
            }
            ]

        }
    ]
});

coverage.plugin(autoIncrement.plugin,
    {
        model:'coverage',
        field: 'Id',
        startAt:1,
        incrementBy:1
    });

mongoose.model("Coverage", coverage);

mongoose.model("Bugs", bugsInstanceSchema);
mongoose.model("users", userSchema);
