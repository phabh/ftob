// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'update-from-blip') {
    updateFromBlip(msg.blipFlowJSON);
  }


  if (msg.type === 'create-rectangles') {
    const nodes: SceneNode[] = [];

    let containBlipFlow = figma.root.children.some( (page, index, pages) => { return page.name.indexOf("blip-flow") > 0;  } );
    console.log(containBlipFlow);
    if(!containBlipFlow)
    {
      figma.createPage();
      let totalPages = figma.root.children.length;
      figma.root.children[totalPages-1].name = "blip-flow";
      figma.currentPage = figma.root.children[totalPages-1];
    }

    for (let i = 0; i < msg.count; i++) {
      const rect = figma.createRectangle();
      rect.x = i * 150;
      rect.fills = [{type: 'SOLID', color: {r: 1, g: 0.5, b: 0}}];
      figma.currentPage.appendChild(rect);
      nodes.push(rect);
    }
    figma.currentPage.selection = nodes;
    figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

function createPageBlipFlow()
{
  let containBlipFlow = figma.root.children.some( (page, index, pages) => { return page.name.indexOf("blip-flow") > 0;  } );
  console.log(containBlipFlow);
  if(!containBlipFlow)
  {
    figma.createPage();
    let totalPages = figma.root.children.length;
    figma.root.children[totalPages-1].name = "blip-flow";
    figma.currentPage = figma.root.children[totalPages-1];
  }
};

function updateFromBlip(blipFlowJSON:string)
{
  createPageBlipFlow();
  let blipFlow = JSON.parse(blipFlowJSON);



}
