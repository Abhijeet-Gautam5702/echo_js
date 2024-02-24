// ECHO-JS

// For the time being, creating a pre-defined element
const element = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blank",
  },
  children: "Visit Google",
};

// Getting hold of the root div defined in the HTML file
const mainRoot = document.querySelector("#root");

// A function which converts JSX code to JS-object
function echoParseJSX(jsxCode) {
  // return JS-object
}

// A function which creates a DOM-Element from the JS-Object
function echoCreateRegularElement(type, props, ...children) {
  return {
    type,
    props: { ...props },
    children: children.map((child) => {
      if (typeof child === "object") {
        return child;
      } else {
        return echoCreateTextElement(child);
      }
    }),
  };
}

// A function which creates a text-element with a custom type:TEXT_TYPE
/*
  NOTE: Consider <div> Hello World </div>

        The final echo-element for this would be like:
        {
          type: "div",
          props: {},
          children: [
            {
              type: "TEXT_TYPE",
              textContent: "Hello World",
              props: {},
              children: [] 
            }
          ]
        }
    
  Basically, We are ensuring that all the inner-text or inner-numbers are also wrapped under a new element of type TEXT_TYPE (which is not an HTML element by the way). This way, they would also be treated as an element only.
*/
function echoCreateTextElement(textContent) {
  return {
    type: "TEXT_TYPE",
    textContent,
    props: {},
    children: [],
  };
}

// A function which renders the element on the Browser DOM
function echoRender(element, parentElement) {
  // Create an echo-element of the given type
  // If the element type is text => create a text node. `TEXT_TYPE` is a custom type we have given to any children which is not an HTML element
  const node =
    element.type === "TEXT_TYPE"
      ? document.createTextNode("")
      : document.echoCreateElement(element.type);

  // Render the children nodes into the current echo-element recursively
  element.children.forEach((child) => {
    echoRender(child, node);
  });

  // Append the echo-element to the root-node
  parentElement.appendChild(node);
}
