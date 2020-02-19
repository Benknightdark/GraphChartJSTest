import { createGitgraph } from "@gitgraph/js";
import $ from "jquery";
// Get the graph container HTML element.
const graphContainer = document.getElementById("graph-container");

// Instantiate the graph.
const gitgraph = createGitgraph(graphContainer);
const master = gitgraph.branch("master");
master.commit({
    subject: "init commit",
    author:"ben <moon@bb.cc>",
    onMessageClick(commit) {
      console.log('click')
    },
    onMouseOver(commit) {
        console.log("You're over this commit ->", event.data);
        this.style.cursor = "pointer";
    },
    onMouseOut(commit) {
        console.log("You just left this commit ->", event.data);
        this.style.cursor = "auto";
    },
  });

const develop = gitgraph.branch("develop");
develop.commit("Add TypeScript");

const aFeature = gitgraph.branch("a-feature");
aFeature
    .commit("Make it work")
    .commit("Make it right")
    .commit("Make it fast");

develop.merge(aFeature);
develop.commit("Prepare v1");

master.merge(develop).tag("v1.0.0");


// $(window).load(()=>{
//     console.log('all done')
// })
$(window).on('load', function () {
    $('svg').addClass('my-svg')//.css('width', '100vh' ).css('height','100vh')
    const textArray = $('svg').find('text');
    textArray.map(b => {
        console.log(textArray[b]);
        $(textArray[b]).css('word-break', ' break-all!important')
    })
});


