
function init() {
    const battle = {
        name: "BattleXArmada",
        image: "/images/battlexarmada-300.gif",
        alt: "BattleXArmada Logo",
        description: "A 'Space Invaders' type video game on endless mode!",
        link: "https://github.com/MiramarCISC/CISC191-SPRING2021-B.git"
    };
    let jBattle = JSON.stringify(battle);
    localStorage.setItem("battle", jBattle);

    let element = document.getElementById("localBtn");
    element.addEventListener('click', function () {
        loadLocal();
    });

    element = document.getElementById("remoteBtn");
    element.addEventListener('click', function () {
        loadRemote();
    });

    element = document.getElementById("clearBtn");
    element.addEventListener('click', function () {
        location.reload();
    });
}



function loadLocal() {
    class ProjectCard extends HTMLElement {
        constructor() {
            super();

            let battleData = JSON.parse(localStorage.getItem("battle"));

            let shadowRoot = this.attachShadow({ mode: 'open' });

            let rootDiv = document.createElement("div");
            rootDiv.setAttribute("id", "proj-root")

            let textDiv = document.createElement("div");
            textDiv.setAttribute("id", "proj-text")

            let styleText = document.createElement("style");
            styleText.textContent =
                `#proj-text{
                display: flex;
                flex-direction: column;
            }
            h2, p, a{
                font-family: 'Courier New', Courier, monospace;
                margin: 0.5rem 1rem 0.5rem 1rem;
            }
        `;

            let styleCard = document.createElement("style");
            styleCard.textContent =
                `#proj-root{
                display: flex; 
                flex-direction: row; 
                justify-content: space-between; 
                margin : auto; 
                margin-top: 3rem;
                margin-bottom: 3rem; 
                padding: 1rem 1rem 1rem 1rem; 
                min-width: 10%; 
                max-width: 30%; 
                border: 2px solid black;
            }

            #proj-root > img {
                max-width: 20rem;
                max-height: 25rem;
                min-width: 5rem;
                min-height: 10rem;
            }
        `;

            let heading = document.createElement("h2");
            heading.innerHTML = `<em>${battleData.name}</em>`;

            let para = document.createElement("p");
            para.textContent = `${battleData.description}`;

            const linkText = document.createElement("a");
            linkText.setAttribute("href", `${battleData.link}`);
            linkText.textContent = "Source Code";

            const projImg = document.createElement("img");
            projImg.setAttribute("src", `${battleData.image}`);
            projImg.setAttribute("alt", `${battleData.alt}`);

            textDiv.appendChild(styleText);
            textDiv.appendChild(heading);
            textDiv.appendChild(para);
            textDiv.appendChild(linkText);

            rootDiv.appendChild(textDiv);
            rootDiv.appendChild(projImg);
            rootDiv.appendChild(styleCard)

            shadowRoot.appendChild(rootDiv);
        }
    }

    customElements.define("project-card", ProjectCard);
}


function loadRemote() {
    const apiKey = "$2b$10$ni4jM0ypOYa6Nm6Y7kdVKeJNDSQYq9Dc2e.DIY7Z1EIEs7kDsMoea";

    const url = "https://api.jsonbin.io/v3/b/64cde3bfb89b1e2299cba700";

    fetch(url, {
        headers: {
            "X-Access-Key": apiKey,
            "Content-Type": 'application/json',
        }
    })

        .then(response => {
            return response.json();
        })

        .then(data => {
            class ProjectCard extends HTMLElement {
                constructor() {
                    super();

                    const shadowRoot = this.attachShadow({ mode: "open" });

                    const futureData = data.record.future;

                    let rootDiv = document.createElement("div");
                    rootDiv.setAttribute("id", "proj-root")

                    let textDiv = document.createElement("div");
                    textDiv.setAttribute("id", "proj-text")

                    let styleText = document.createElement("style");
                    styleText.textContent =
                        `#proj-text{
                            display: flex;
                            flex-direction: column;
                        }
                        h2, p, a{
                            font-family: 'Courier New', Courier, monospace;
                            margin: 0.5rem 1rem 0.5rem 1rem;
                        }
                    `;

                    let styleCard = document.createElement("style");
                    styleCard.textContent =
                        `#proj-root{
                            display: flex; 
                            flex-direction: row; 
                            justify-content: space-between; 
                            margin : auto; 
                            margin-top: 3rem;
                            margin-bottom: 3rem; 
                            padding: 1rem 1rem 1rem 1rem; 
                            min-width: 10%; 
                            max-width: 30%; 
                            border: 2px solid black;
                        }

                        #proj-root > img {
                        max-width: 20rem;
                        max-height: 25rem;
                        min-width: auto;
                        min-height: auto;
                        }
                    `;

                    const heading = document.createElement("h2");
                    heading.innerHTML = `<em>${futureData[0].name}</em>`;

                    const para = document.createElement("p");
                    para.textContent = `${futureData[0].description}`;

                    const linkText = document.createElement("a");
                    linkText.setAttribute("href", `${futureData[0].link}`);
                    linkText.textContent = "Source Code";

                    const projImg = document.createElement("img");
                    projImg.setAttribute("src", `${futureData[0].image}`);
                    projImg.setAttribute("alt", `${futureData[0].alt}`);

                    textDiv.appendChild(styleText);
                    textDiv.appendChild(heading);
                    textDiv.appendChild(para);
                    textDiv.appendChild(linkText);

                    rootDiv.appendChild(textDiv);
                    rootDiv.appendChild(projImg);
                    rootDiv.appendChild(styleCard)

                    shadowRoot.appendChild(rootDiv);
                }
            }

            customElements.define("project-card", ProjectCard);
        })

}

window.addEventListener('DOMContentLoaded', init);