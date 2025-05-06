document.addEventListener('DOMContentLoaded', function() {
            const hamburger = document.querySelector(".hamburger");
            const navLinks = document.querySelector(".nav-links");
            const links = document.querySelectorAll(".nav-links a");

            const currentPath = window.location.pathname;
            const currentPage = currentPath.split('/').pop() || 'index.html';

            // Highlight link menu navigasi yang sedang aktif
            links.forEach(link => {
                const linkPath = link.getAttribute("href");
                const linkPage = linkPath.split('/').pop();

                // Periksa apakah link saat ini cocok dengan halaman yang aktif
                if (linkPage === currentPage ||
                    (currentPage === 'index.html' && linkPath === './index.html') ||
                    (currentPage === '' && linkPath === './index.html')) {
                    link.classList.add("active");
                } else {
                    link.classList.remove("active");
                }
            });

            // Event listener untuk hamburger menu (navigasi di mobile)
            if (hamburger) {
                hamburger.addEventListener("click", (e) => {
                    e.stopPropagation();
                    navLinks.classList.toggle("active");
                });

                // Menutup menu jika klik di luar navigasi
                document.addEventListener("click", (e) => {
                    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
                        navLinks.classList.remove("active");
                    }
                });
            }

            // Agents data
            const agents = [{
                name: "PHOENIX",
                role: "duelist",
                details: "British firestarter who fights with fiery passion. His abilities allow him to take fights on his own terms, creating opportunities to blaze a path through enemy defenses.",
                image: "../assets/images/agents/phoenix.png",
                bio: "Hailing from the UK, Phoenix's star power shines through in his fighting style, igniting the battlefield with flash and flare. Whether he's got backup or not, he'll rush into a fight on his own terms.",
                abilities: [{
                    name: "BLAZE",
                    icon: "🔥",
                    type: "Basic Ability (200 Credits)",
                    effects: ["Blocks vision", "Damages enemies"],
                    description: "Creates a wall of flame that blocks vision and damages enemies who pass through it. Lasts 8 seconds.",
                    tip: "Use to block choke points or cut off rotations"
                }, {
                    name: "CURVEBALL",
                    icon: "🎯",
                    type: "Basic Ability (250 Credits)",
                    effects: ["Blinds enemies"],
                    description: "Throw a curving flashbang that blinds enemies looking at it when it explodes after 1 second.",
                    tip: "Bounce off walls for unexpected angles"
                }, {
                    name: "HOT HANDS",
                    icon: "✋",
                    type: "Basic Ability (Free)",
                    effects: ["Area damage", "Self-heal"],
                    description: "Throw a fireball that creates a burning zone. Standing in it heals Phoenix but damages enemies.",
                    tip: "Use in corners to force enemies out"
                }, {
                    name: "RUN IT BACK",
                    icon: "⏱️",
                    type: "Ultimate (7 Points)",
                    effects: ["Respawn"],
                    description: "Mark your position. If you die within 10 seconds, you'll respawn here with full health.",
                    tip: "Use aggressively to gather info or secure kills"
                }],
                tips: [
                    "Use Blaze to cut off enemy rotations or block off choke points",
                    "Combine Curveball with Hot Hands to push enemies out of position",
                    "Run It Back can be used aggressively to gather information",
                    "Phoenix excels at taking space and creating opportunities for his team"
                ]
            }, {
                name: "JETT",
                role: "duelist",
                details: "A Korean agile fighter who specializes in rapid movement and precision attacks. Her abilities allow her to dash around the battlefield and eliminate enemies with pinpoint accuracy.",
                image: "../assets/images/agents/jett.png",
                bio: "Representing her home country of South Korea, Jett's agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies before they even know what hit them.",
                abilities: [{
                    name: "UPDRAFT",
                    icon: "🔼",
                    type: "Basic Ability (150 Credits)",
                    effects: ["Vertical mobility"],
                    description: "Propels Jett high into the air to reach elevated positions.",
                    tip: "Use to access unexpected angles"
                }, {
                    name: "TAILWIND",
                    icon: "💨",
                    type: "Basic Ability (Free)",
                    effects: ["Horizontal dash"],
                    description: "Dashes a short distance in the direction Jett is moving.",
                    tip: "Use to quickly reposition during fights"
                }, {
                    name: "CLOUDBURST",
                    icon: "☁️",
                    type: "Basic Ability (200 Credits)",
                    effects: ["Smoke screen"],
                    description: "Throw out a cloud of fog that obscures vision on impact.",
                    tip: "Use to block sightlines or fake pushes"
                }, {
                    name: "BLADE STORM",
                    icon: "⚔️",
                    type: "Ultimate (7 Points)",
                    effects: ["Precision knives"],
                    description: "Equip a set of highly accurate throwing knives that recharge on killing an opponent.",
                    tip: "Aim for headshots to maximize effectiveness"
                }],
                tips: [
                    "Use Tailwind to quickly reposition during fights",
                    "Combine Updraft with Blade Storm for aerial attacks",
                    "Cloudburst can be used to block sightlines or fake pushes",
                    "Jett is excellent at creating space and getting first picks"
                ]
            }, {
                name: "SAGE",
                role: "sentinel",
                details: "Chinese support specialist who can heal allies and resurrect fallen teammates. Her abilities focus on sustaining her team and controlling areas of the map.",
                image: "../assets/images/agents/sage.png",
                bio: "The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off aggressive pushes, she provides a calm center to a hellish battlefield.",
                abilities: [{
                    name: "BARRIER ORB",
                    icon: "🧱",
                    type: "Basic Ability (400 Credits)",
                    effects: ["Wall construction"],
                    description: "Conjure a large, solid wall that blocks movement and vision.",
                    tip: "Use to block off key choke points"
                }, {
                    name: "SLOW ORB",
                    icon: "🐢",
                    type: "Basic Ability (200 Credits)",
                    effects: ["Movement slow"],
                    description: "Cast out an orb that breaks into a slowing field upon impact with the ground.",
                    tip: "Excellent for stopping enemy pushes"
                }, {
                    name: "HEALING ORB",
                    icon: "💚",
                    type: "Basic Ability (Free)",
                    effects: ["Health restoration"],
                    description: "Heal an ally or yourself to full health over a few seconds.",
                    tip: "Save for critical moments in the round"
                }, {
                    name: "RESURRECTION",
                    icon: "🔄",
                    type: "Ultimate (8 Points)",
                    effects: ["Ally revive"],
                    description: "Target a friendly corpse to begin reviving them. After a brief channel, the ally will be resurrected with full health.",
                    tip: "Can turn the tide of a round - use wisely"
                }],
                tips: [
                    "Use Barrier Orb to block off key choke points",
                    "Save Healing Orb for critical moments in the round",
                    "Resurrection can turn the tide of a round - use it wisely",
                    "Slow Orb is excellent for stopping enemy pushes"
                ]
            }, {
                name: "SOVA",
                role: "initiator",
                details: "Russian recon specialist who excels at gathering information. His abilities allow him to track and reveal enemy positions, making him invaluable for team strategies.",
                image: "../assets/images/agents/sova.png",
                bio: "Born from the eternal winter of Russia's tundra, Sova tracks, finds, and eliminates enemies with ruthless efficiency and precision. His custom bow and incredible scouting abilities ensure that even if you run, you cannot hide.",
                abilities: [{
                    name: "SHOCK BOLT",
                    icon: "⚡",
                    type: "Basic Ability (150 Credits)",
                    effects: ["Area damage"],
                    description: "Fires an explosive bolt that emits a damaging pulse of static energy upon impact.",
                    tip: "Great for clearing corners and tight spaces"
                }, {
                    name: "RECON BOLT",
                    icon: "👁️",
                    type: "Basic Ability (300 Credits)",
                    effects: ["Enemy detection"],
                    description: "Fires a bolt that deploys a sonar emitter, revealing nearby enemies.",
                    tip: "Use to gather information at the start of rounds"
                }, {
                    name: "OWL DRONE",
                    icon: "🦉",
                    type: "Basic Ability (400 Credits)",
                    effects: ["Remote scouting"],
                    description: "Deploys a pilotable drone that can fire a marking dart to reveal enemies.",
                    tip: "Can safely scout dangerous areas"
                }, {
                    name: "HUNTER'S FURY",
                    icon: "🏹",
                    type: "Ultimate (8 Points)",
                    effects: ["Wall penetration"],
                    description: "Fires up to three deadly energy blasts that pierce through walls and enemies.",
                    tip: "Use to finish off weak enemies through walls"
                }],
                tips: [
                    "Use Recon Bolt to gather information at the start of rounds",
                    "Shock Bolt is great for clearing corners and tight spaces",
                    "Owl Drone can safely scout dangerous areas",
                    "Hunter's Fury can be used to finish off weak enemies through walls"
                ]
            }, {
                name: "VIPER",
                role: "controller",
                details: "American chemist who specializes in area denial through toxic chemicals. Her abilities allow her to control sightlines and force enemies out of position.",
                image: "../assets/images/agents/viper.png",
                bio: "The American chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy's vision. If the toxins don't kill her prey, her mind games surely will.",
                abilities: [{
                    name: "POISON CLOUD",
                    icon: "☁️",
                    type: "Basic Ability (200 Credits)",
                    effects: ["Vision block", "Damage over time"],
                    description: "Throw a gas emitter that can be reactivated to create a poisonous smoke cloud at the cost of fuel.",
                    tip: "Manage your fuel carefully"
                }, {
                    name: "TOXIC SCREEN",
                    icon: "🧪",
                    type: "Basic Ability (Free)",
                    effects: ["Wall of gas"],
                    description: "Deploy a long line of gas emitters that can be reactivated to create a tall wall of toxic gas at the cost of fuel.",
                    tip: "Great for dividing sites"
                }, {
                    name: "SNAKE BITE",
                    icon: "🐍",
                    type: "Basic Ability (100 Credits)",
                    effects: ["Area denial"],
                    description: "Launch a canister that shatters upon landing, creating a lingering chemical zone that damages and slows enemies.",
                    tip: "Use to force enemies out of cover"
                }, {
                    name: "VIPER'S PIT",
                    icon: "🕳️",
                    type: "Ultimate (7 Points)",
                    effects: ["Area control"],
                    description: "Sprays a massive chemical cloud in all directions around Viper, creating a large area that reduces vision and drains health.",
                    tip: "Extremely powerful for post-plant situations"
                }],
                tips: [
                    "Manage your fuel carefully when using Poison Cloud and Toxic Screen",
                    "Use Snake Bite to force enemies out of cover",
                    "Viper's Pit is extremely powerful for post-plant situations",
                    "Combine abilities to create layered area denial"
                ]
            }];

            const agentsContainer = document.getElementById('agentsContainer');
            const searchInput = document.getElementById('agentSearch');
            const roleFilters = document.querySelectorAll('.role-filter');
            const agentModal = document.getElementById('agentModal');
            const closeModal = document.getElementById('closeModal');
            const modalHeader = document.getElementById('modalHeader');
            const modalBody = document.getElementById('modalBody');

            // Initial render
            renderAgents(agents);

            // Search functionality
            searchInput.addEventListener('input', filterAgents);

            // Role filter functionality
            roleFilters.forEach(filter => {
                filter.addEventListener('click', function() {
                    roleFilters.forEach(f => f.classList.remove('active'));
                    this.classList.add('active');
                    filterAgents();
                });
            });

            // Close modal
            closeModal.addEventListener('click', () => {
                agentModal.classList.remove('active');
            });

            // Close modal when clicking outside
            agentModal.addEventListener('click', (e) => {
                if (e.target === agentModal) {
                    agentModal.classList.remove('active');
                }
            });

            function filterAgents() {
                const searchTerm = searchInput.value.toLowerCase();
                const activeRole = document.querySelector('.role-filter.active').dataset.role;

                const filteredAgents = agents.filter(agent => {
                    const matchesSearch = agent.name.toLowerCase().includes(searchTerm) ||
                        agent.role.toLowerCase().includes(searchTerm) ||
                        agent.details.toLowerCase().includes(searchTerm);
                    const matchesRole = activeRole === 'all' || agent.role === activeRole;
                    return matchesSearch && matchesRole;
                });

                renderAgents(filteredAgents);
            }

            function renderAgents(agentsToRender) {
                agentsContainer.innerHTML = '';

                if (agentsToRender.length === 0) {
                    agentsContainer.innerHTML = `
        <div class="no-results">
            NO AGENTS FOUND
            <div style="font-size:0.9rem;margin-top:10px;opacity:0.6;">Try different search terms or filters</div>
        </div>`;
                    return;
                }

                agentsToRender.forEach(agent => {
                            const agentCard = document.createElement('div');
                            agentCard.className = 'agent-card';
                            agentCard.dataset.role = agent.role;

                            // Highlight search term in name
                            const searchTerm = searchInput.value.toLowerCase();
                            let displayName = agent.name;
                            if (searchTerm) {
                                const regex = new RegExp(searchTerm, 'gi');
                                displayName = agent.name.replace(regex, match =>
                                    `<span style="background:rgba(220,0,211,0.3);border-radius:2px;padding:0 2px;">${match}</span>`
                                );
                            }

                            // Get role color class
                            const roleClass = agent.role.toLowerCase();

                            agentCard.innerHTML = `
        <div class="agent-image-container">
            <img src="${agent.image}" alt="${agent.name}" class="agent-image">
        </div>
        <div class="agent-info">
            <h3 class="agent-name">${displayName}</h3>
            <span class="agent-role ${roleClass}">
                <span>${getRoleEmoji(agent.role)}</span>
                ${agent.role.toUpperCase()}
            </span>
            <div class="agent-details">
                <p>${agent.details}</p>
            </div>
            <div class="agent-abilities">
                ${agent.abilities.slice(0, 4).map(ability => `
                    <div class="ability-icon">
                        ${ability.icon}
                        <div class="ability-tooltip">${ability.name}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Add click event to open modal
    agentCard.addEventListener('click', () => {
        openAgentModal(agent);
    });

    agentsContainer.appendChild(agentCard);
});
}

function openAgentModal(agent) {
// Set modal header
modalHeader.innerHTML = `
    <img src="${agent.image}" alt="${agent.name}" class="modal-agent-image">
    <div class="modal-agent-info">
        <h2 class="modal-agent-name">${agent.name}</h2>
        <span class="modal-agent-role ${getRoleColorClass(agent.role)}">
            <span>${getRoleEmoji(agent.role)}</span>
            ${agent.role.toUpperCase()}
        </span>
        <p class="modal-agent-bio">${agent.bio}</p>
    </div>
`;

// Set modal body
modalBody.innerHTML = `
    <div class="abilities-section">
        <h3 class="section-title">ABILITIES</h3>
        <div class="abilities-grid">
            ${agent.abilities.map(ability => `
                <div class="ability-card">
                    <div class="ability-header">
                        <div class="ability-icon-lg">${ability.icon}</div>
                        <div class="ability-meta">
                            <div class="ability-name">${ability.name}</div>
                            <div class="ability-type">${ability.type}</div>
                        </div>
                    </div>
                    <div class="ability-effect">
                        ${ability.effects.map(effect => `
                            <span><span style="color:var(--tertiary-color);margin-right:5px;">${getEffectEmoji(effect)}</span> ${effect}</span>
                        `).join('')}
                    </div>
                    <div class="ability-desc">
                        <p>${ability.description}</p>
                        <div class="ability-tip">
                            <span style="color:var(--tertiary-color);margin-right:5px;">💡</span> ${ability.tip}
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    </div>
    <div class="playstyle-tips">
        <h3 class="section-title">PLAYSTYLE TIPS</h3>
        <ul class="tips-list">
            ${agent.tips.map(tip => `<li>${tip}</li>`).join('')}
        </ul>
    </div>
`;

// Show modal
agentModal.classList.add('active');
}

function getRoleEmoji(role) {
switch(role.toLowerCase()) {
    case 'duelist': return '⚡';
    case 'initiator': return '🎯';
    case 'controller': return '☁️';
    case 'sentinel': return '🛡️';
    default: return '👤';
}
}

function getRoleColorClass(role) {
switch(role.toLowerCase()) {
    case 'duelist': return 'duelist';
    case 'initiator': return 'initiator';
    case 'controller': return 'controller';
    case 'sentinel': return 'sentinel';
    default: return '';
}
}

function getEffectEmoji(effect) {
switch(effect.toLowerCase()) {
    case 'blocks vision': return '👁️';
    case 'damages enemies': return '🔥';
    case 'blinds enemies': return '👓';
    case 'self-heal': return '❤️';
    case 'respawn': return '🔄';
    case 'vertical mobility': return '⬆️';
    case 'horizontal dash': return '↔️';
    case 'smoke screen': return '🌫️';
    case 'precision knives': return '🎯';
    case 'wall construction': return '🧱';
    case 'movement slow': return '🐢';
    case 'health restoration': return '💚';
    case 'ally revive': return '🔄';
    case 'area damage': return '💥';
    case 'enemy detection': return '👀';
    case 'remote scouting': return '👁️';
    case 'wall penetration': return '↗️';
    case 'vision block': return '🚫';
    case 'damage over time': return '⏳';
    case 'wall of gas': return '🌫️';
    case 'area denial': return '🚷';
    case 'area control': return '🎛️';
    default: return 'ℹ️';
}
}
});