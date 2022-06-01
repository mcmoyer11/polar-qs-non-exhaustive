PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment

// First show instructions, then experiment trials, send results and show end screen
Sequence(
       "Intro",
    //    "StoryIntro1",
    //    "StoryIntro2",
    //    rshuffle("training"),
    //             "TrainEnd",
        rshuffle(    
            rshuffle("test"),
          rshuffle("fillers")
            ),
            "Demo",
       SendResults(),
        "end")


// This is run at the beginning of each trial
Header(
    // Declare a global Var element "ID" in which we will store the participant's ID
    newVar("ID").global()    
)
.log( "id" , getVar("ID") ) // Add the ID to all trials' results lines



newTrial("Intro",
    // Automatically print all Text elements, centered
    defaultText.center().print()
    ,
    newText("<p>Hello! Welcome to the experiment!</p>")
        .bold()
    ,
    newText("In this task, you will read some short stories and answer a question about each story.")
    ,
    newText("Please type in your ID below.")
    ,
    newTextInput("inputID", "")
        .center()
        .css("margin","1em")    // Add a 1em margin around this element
        // .before( newText("before", "<p>Please enter your unique participant ID. </p>") )
        .print()
    ,
    newText("warning", "Please enter your ID first")
        .color("red")
        .bold()
        .remove()
    ,
    newButton("consent button", "By clicking this button I indicate my consent.")
        .center()
        .print()
        // Only validate a click on Start when inputID has been filled
        .wait(  // Make sure the TextInput has been filled
            getTextInput("inputID")
                .testNot.text("")
                .failure( getText("warning").print() )
        )
    ,
    // Store the text from inputID into the Var element
    getVar("inputID").set( getTextInput("inputID") )
)

// test items
Template( "test.csv", row =>
        newTrial("test",
            newText("Context", `<p>${row.Contexts}</p>`)
                .center()
                .print()
            ,
            newText("<br>")
            ,
            newText("Question", `<p>${row.Questioner}, <b>"${row.Question}?"</b></p>`)
                .center()
                .print()
            ,
            newText("<br>")
            ,
            newText("Answer", `<p>${row.ansUpper + row.Answerer} responds, <b>"${row.Answer}."</b>`)
                .center()
                .print()
            ,
            newText("<br>")
            ,
            newText("Judgement", `<p>Does ${row.ansLower + row.Answerer} have a good idea of ${row.WhComp}?</p>`)
                .center()
                .print()
            ,
            newText("<p> Press <strong>F</strong> for <strong>Yes</strong> or <strong>J</strong> for <strong>No</strong><p>")
                .center()
                .print()
            ,
            newKey("select","FJ")
                .log()
                .wait()
                .log()
        )
        .log( "ID" , getVar("ID") )
        .log( "TrialType" , row.Type )
        .log( "Stakes" , row.Stakes )
        .log( "Story" , row.Story )
        .log( "Answer" , row.Answer )

)

// filler items
Template( "fillers.csv", row =>
        newTrial("fillers",
            newText("Context", `<p>${row.Contexts}</p>`)
                .center()
                .print()
            ,
            newText("<br>")
            ,
            newText("Question", `<p>${row.Questioner}, <b>"${row.Question}?"</b></p>`)
                .center()
                .print()
            ,
            newText("<br>")
            ,
            newText("Answer", `<p>${row.ansUpper + row.Answerer} responds, <b>"${row.Answer}."</b>`)
                .center()
                .print()
            ,
            newText("<br>")
            ,
            newText("Judgement", `<p>Does ${row.ansLower + row.Answerer} have a good idea of ${row.WhComp}?</p>`)
                .center()
                .print()
            ,
            newText("<p> Press <strong>F</strong> for <strong>Yes</strong> or <strong>J</strong> for <strong>No</strong><p>")
                .center()
                .print()
            ,
            newKey("select","FJ")
                .log()
                .wait()
                .log()
        )
        .log( "ID" , getVar("ID") )
        .log( "TrialType" , row.Type )
        .log( "Stakes" , row.Stakes )
        .log( "Story" , row.Story )
        .log( "Answer" , row.Answer )

)

newTrial("Demo",
    defaultText.center().print()
    ,
    newText("Thanks! The experiment is over. Please take a couple moments to answer some demographic questions.")
    ,
    newText("What is your native language?")
    ,
    newTextInput("NativeLang", "")
        .log()
        .css("margin","2em")
        .center()
        .print()
    ,
    newText("Do you speak any other languages?")
    ,
    newTextInput("OtherLangs", "")
        .log()
        .css("margin","2em")
        .center()
        .print()
    ,
    newText("What is your gender?")
    ,
    newTextInput("Gender","")
        .log()
        .css("margin","2em")
        .center()
        .print()
    ,
    newText("What is your highest level of education?")
    ,
    newTextInput("Education", "")
        .log()
        .css("margin","2em")
        .center()
        .print()
    ,
    newText("Were there any problems with the experiment?")
    ,
    newTextInput("Problems", "")
        .log()
        .css("margin","2em")
        .center()
        .print()
    ,
    newText("Any other comments?")
    ,
    newTextInput("Comments", "")
        .log()
        .css("margin","2em")
        .center()
        .print()
    ,
    newText("warning", "Please enter your native language.")
        .color("red")
        .bold()
        .remove()
    ,
    newButton("final", "Click to proceed to the completion screen.")
        .center()
        .print()
        // Only validate a click on Start when inputID has been filled
        .wait(  // Make sure the TextInput has been filled
            getTextInput("NativeLang")
                .testNot.text("")
                .failure( getText("warning").print() )
        )
)

// Final screen
newTrial("end",
    newText("Thank you for your participation!")
        .center()
        .print()
    ,
    // This link a placeholder: replace it with a URL provided by your participant-pooling platform
    newText("<p><a href='https://www.pcibex.net/' target='_blank'>Click here to validate your submission</a></p>")
        .center()
        .print()
    ,
    // Trick: stay on this trial forever (until tab is closed)
    newButton().wait()
)
.setOption("countsForProgressBar",false)