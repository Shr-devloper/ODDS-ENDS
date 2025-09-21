// Predefined list of project ideas based on waste materials

import { signOut } from "https://www.gstatic.com/firebasejs/9.6.0/firebase-auth.js";
const projectIdeas = {
    "plastic bottle": [
      {
        title: "Plastic Bottle Bird Feeder",
        description: "Transform a plastic bottle into a simple bird feeder. A fun way to recycle plastic and help the wildlife!",
        tutorialLink: "https://pin.it/wNKK2GwxJ",
      },
      {
        title: "Plastic Bottle Planter",
        description: "Make a cute planter out of a plastic bottle to grow small plants or herbs.",
        tutorialLink: "https://pin.it/5omJbLI7C",
      },
    ],
    "old t-shirt": [
      {
        title: "T-Shirt Tote Bag",
        description: "Turn your old t-shirt into a trendy reusable shopping bag. Quick and easy DIY project!",
        tutorialLink: "https://pin.it/695BzyUa0",
      },
      {
        title: "T-Shirt Rug",
        description: "Repurpose old t-shirts into a cozy and colorful rug.",
        tutorialLink: "https://pin.it/6aqwLBN45",
      },
    ],
    "cardboard": [
      {
        title: "Cardboard Drawer Organizer",
        description: "Reuse cardboard to make a custom drawer organizer. Declutter your space with recycled materials.",
        tutorialLink: "https://www.instagram.com/reel/CvXS-hlJFss/?utm_source=ig_web_button_share_sheet",
      },
      {
        title: "Cardboard Shelf",
        description: "Make a simple shelf out of cardboard. Perfect for lightweight storage!",
        tutorialLink: "https://www.instagram.com/reel/CqbD6PJo2Jb/?utm_source=ig_web_button_share_sheet",
      },
    ],
    "glass jar": [
      {
        title: "Glass Jar Candle Holder",
        description: "Use old glass jars to create rustic and chic candle holders for home decor.",
        tutorialLink: "https://www.instagram.com/reel/CnXg8oxMkH_/?utm_source=ig_web_button_share_sheet",
      },
      {
        title: "Glass Jar Soap Dispenser",
        description: "Turn a mason jar into a soap dispenser by attaching a pump top.",
        tutorialLink:"https://pin.it/2xAl1sGtK",
      },
      {
        title: "Glass Jar Terrarium",
        description: "Fill glass jars with soil, pebbles, and small plants to create your own mini indoor garden.",
        tutorialLink:"https://pin.it/5TMkvvdAg",
      },
    ],
    "old newspapers": [
      {
        title: "Paper Mâché Bowls",
        description: "Use old newspapers and glue to create decorative paper mâché bowls or sculptures.",
        tutorialLink:"https://pin.it/2kriMcUe2",
      },
      {
        title: "Paper Seed Pots",
        description: "Roll newspaper into seedling pots that are biodegradable and perfect for starting plants.",
        tutorialLink:"https://pin.it/540wsl5dh",
      },
      {
        title: "Origami Wall Art",
        description: "Fold newspaper pages into intricate origami shapes and attach them to a canvas to make a statement wall art piece.",
        tutorialLink:"https://pin.it/46diT7RnW",
      },
    ],
    "tin can": [
      {
        title: "Tin Can Lanterns",
        description: "Punch holes in a tin can and add a candle inside to create beautiful, ambient lanterns.",
        tutorialLink:"#",
      },
      {
        title: "Tin Can Herb Garden",
        description: "Use small tin cans as planters for growing herbs on your windowsill.",
        tutorialLink:"#",
      },
      {
        title: "Tin Can Wind Chimes",
        description: "Cut and decorate tin cans to make whimsical wind chimes for your garden or porch.",
        tutorialLink:"#",
      },
    ],
    "old wooden pallets": [
      {
        title: "Pallet Coffee Table",
        description: "Reuse wooden pallets to make a rustic coffee table, adding wheels for easy movement.",
        tutorialLink:"#",
      },
      {
        title: "Pallet Bookshelf",
        description: "Stack pallets vertically to create a bookshelf for home or office use.",
        tutorialLink:"#",
      },
      {
        title: "Pallet Garden Planter",
        description: "Convert pallets into raised garden beds or planters to grow vegetables, flowers, or herbs.",
        tutorialLink:"#",
      },
  
    ],
    "cd/dvd": [
      {
        title: "CD Mosaic Mirror",
        description: "Break old CDs into pieces and glue them to a mirror frame to create a shiny mosaic.",
        tutorialLink:"#",
      },
      {
        title: "CD Wall Art",
        description: " Use old CDs to make unique wall art by gluing them together in a creative design.",
        tutorialLink:"#",
      },
      {
        title: "CD Coasters",
        description: "Decorate old CDs with fabric or paper to turn them into colorful coasters.",
        tutorialLink:"#",
      },
    ],
    "old jeans & denim": [
      {
        title: "Denim Apron",
        description: "Use old jeans to make a durable and stylish apron for cooking or crafting.",
        tutorialLink:"#",
      },
      {
        title: "Denim Pouch or Bag",
        description: "Repurpose old jeans into a small pouch or bag for carrying essentials.",
        tutorialLink:"#",
      },
      {
        title: "Denim Quilt",
        description: "Cut jeans into squares and stitch them together to create a cozy, denim patchwork quilt.",
        tutorialLink:"#",
      },
    ],
    "broken furniture or wood scraps": [
      {
        title: "Recycled Furniture",
        description: "Transform old wooden chairs, tables, or cabinets by repainting and refurbishing them into new functional pieces.",
        tutorialLink:"#",
      },
      {
        title: "Wooden Coasters",
        description: "Cut up small wood scraps and sand them down to create stylish wooden coasters for drinks.",
        tutorialLink:"#",
      },
      {
        title: "Wooden Wall Hooks",
        description: "Repurpose broken wood pieces to create stylish and functional wall hooks or hangers.",
        tutorialLink:"#",
      },
    ],
    "plastic bags": [
      {
        title: "Plastic Bag Yarn (Plarn)",
        description: "Cut plastic bags into strips and crochet or knit them into items like bags, mats, or baskets.",
        tutorialLink:"#",
      },
      {
        title: "Plastic Bag Poncho",
        description: "Stitch together plastic bags to create a rain poncho or cape.",
        tutorialLink:"#",
      },
      {
        title: "Plastic Bag Flower",
        description: "Cut plastic bags into flower petals and glue them together to make decorative flowers for home decor or events.",
        tutorialLink:"#",
      },
    ],
    "old coffee mugs": [
      {
        title: "Mug Planters",
        description: "Turn old, chipped mugs into unique planters for small plants or succulents.",
        tutorialLink:"#",
      },
      {
        title: "Mug Candle Holder",
        description: " Fill an old mug with wax and a wick to create a cozy candle.",
        tutorialLink:"#",
      },
      {
        title: "Mug Wall Hooks",
        description: "Attach mugs to a wooden board to create an unusual yet functional mug rack for the kitchen.",
        tutorialLink:"#",
      },
    ],
    "old magazines and catalogs": [
      {
        title: "Magazine Coasters",
        description: "Roll or fold magazine pages to make colorful coasters for your table.",
        tutorialLink:"#",
      },
      {
        title: "Magazine Wall Art",
        description: "Use pages from magazines to create collage-style artwork or decoupage projects.",
        tutorialLink:"#",
      },
      {
        title: "Magazine Beads",
        description: "Cut magazines into strips and roll them into beads to make jewelry or decorative items.",
        tutorialLink:"#",
      },
    ],
    "used teabags": [
      {
        title: "Teabag Wall Art",
        description: "Dry and flatten used teabags and create a natural art piece using their textures and colors.",
        tutorialLink:"#",
      },
      {
        title: "Teabag Sachets",
        description: "Fill old teabags with dried flowers or herbs and use them as natural sachets for your drawers.",
        tutorialLink:"#",
      },
      {
        title: "Teabag Gift Tags",
        description: "Reuse teabags as unique gift tags by folding and decorating them.",
        tutorialLink:"#",
      },
    ],
    "old electronics": [
      {
        title: "Computer Part Sculpture",
        description: ": Recycle old electronic parts (like circuit boards, wires, and old hard drives) into an artistic sculpture.",
        tutorialLink:"#",
      },
      {
        title: "Keyboard Tray Organizer",
        description: "Repurpose old computer keyboards by removing the keys and turning them into drawer organizers or wall hooks.",
        tutorialLink:"#",
      },
      {
        title: "Old Speakers into Planters",
        description: "Use the casings of broken speakers to create funky, industrial-style planters.",
        tutorialLink:"#",
      },
    ],
    "broken umbrella parts": [
      {
        title: "Umbrella Flowerpot Holder",
        description: "Repurpose the frame of a broken umbrella as a hanging flower pot holder or garden decoration.",
        tutorialLink:"#",
      },
      {
        title: "Umbrella Lantern",
        description: "Create a whimsical lantern by hanging a broken umbrella upside down and placing lights inside.",
        tutorialLink:"#",
      },
      {
        title: "Umbrella Wind Chime",
        description: "Use parts of the umbrella to create a wind chime by attaching metal or other sound-producing objects to the spokes.",
        tutorialLink:"#",
      },
    ],
    "egg cartons":[
      {
        title:"Egg Carton Flowers",
        description:"Cut and paint egg carton sections to resemble flowers, then attach them to sticks for a DIY bouquet.",
        tutorialLink:"#",
      },
      {
        title:"Egg Carton Jewelry Organizer",
        description:"Use the compartments to store rings, earrings, or small trinkets.",
        tutorialLink:"#",
      },
      {
        title:"Egg Carton Caterpillar",
        description:"Paint and connect egg carton sections to make a fun caterpillar toy for kids.",
        tutorialLink:"#",
      },
    ],
    "wine corks":[
      {
        title:"Cork Coasters",
        description:"Glue together several wine corks to create eco-friendly drink coasters.",
        tutorialLink:"#",
      },
      {
        title:"Cork Bulletin Board",
        description:" Attach wine corks to a wooden frame to make a rustic pinboard.",
        tutorialLink:"#",
      },
      {
        title:"Cork Keychains",
        description:" Drill a hole in a cork and attach a keyring for a simple floating keychain.",
        tutorialLink:"#",
      },
    ],
    "toilet paper rolls":[
      {
        title:"TP Roll Gift Boxes",
        description:"Fold and decorate toilet paper rolls into small gift boxes.",
        tutorialLink:"#",
      },
      {
        title:"TP Roll Cable Organizers",
        description:"Use rolls to store and organize cables neatly.",
        tutorialLink:"#",
      },
      {
        title:"TP Roll Wall Art",
        description:"Cut and arrange rolls into flower or geometric patterns for a modern wall decor piece.",
        tutorialLink:"#",
      },
    ],
    "broken watches":[
      {
        title:"Watch Gear Earrings",
        description:"Use tiny gears and parts from broken watches to make steampunk-inspired jewelry.",
        tutorialLink:"#",
      },
      {
        title:"Bracelet Bookmarks",
        description:"Turn old metal bangles into bookmarks by adding fabric or beads.",
        tutorialLink:"#",
      },
      {
        title:"Jewelry Art Frame",
        description:"Arrange broken jewelry pieces into a framed art collage.",
        tutorialLink:"#",
      },
    ],
    "broken jewelry":[
      {
        title:"Bracelet Bookmarks",
        description:"Turn old metal bangles into bookmarks by adding fabric or beads.",
        tutorialLink:"#",
      },
      {
        title:"Jewelry Art Frame",
        description:"Arrange broken jewelry pieces into a framed art collage.",
        tutorialLink:"#",
      },
    ],
    "old light bulb":[
      {
        title:"Miniature Light Bulb Terrariums",
        description:"Fill old bulbs with tiny plants, moss, or sand for an elegant display.",
        tutorialLink:"#",
      },
      {
        title:"Light Bulb Oil Lamps",
        description:"Convert used bulbs into stylish oil lamps for a warm ambiance.",
        tutorialLink:"#",
      },
      {
        title:"Light Bulb Snow Globes",
        description:"Create DIY snow globes by adding water, glitter, and small figurines inside a sealed bulb.",
        tutorialLink:"#",
      },
    ],
    "old shoes":[
      {
        title:"Shoe Planters",
        description:"Turn old boots or sneakers into quirky outdoor planters.",
        tutorialLink:"#",
      },
      {
        title:"Shoe Birdhouse",
        description:"Hang an old shoe on a tree and turn it into a birdhouse.",
        tutorialLink:"#",
      },
      {
        title:"Shoe Storage Caddy",
        description:"Mount old shoes on a wall for use as storage compartments.",
        tutorialLink:"#",
      },
    ],
    "expired credit cards":[
      {
        title:"Guitar Picks",
        description:"Cut old plastic cards into small guitar picks",
        tutorialLink:"#",
      },
      {
        title:"DIY Keychains",
        description:"Cut out shapes from plastic cards and attach them to key rings.",
        tutorialLink:"#",
      },
      {
        title:"Zipper Pulls",
        description:"Punch a hole in a piece of a plastic card and use it as a zipper pull.",
        tutorialLink:"#",
      },
    ],
    "gift cards":[
      {
        title:"Guitar Picks",
        description:"Cut old plastic cards into small guitar picks",
        tutorialLink:"#",
      },
      {
        title:"DIY Keychains",
        description:"Cut out shapes from plastic cards and attach them to key rings.",
        tutorialLink:"#",
      },
      {
        title:"Zipper Pulls",
        description:"Punch a hole in a piece of a plastic card and use it as a zipper pull.",
        tutorialLink:"#",
      },
    ],
    "broken window blinds":[
      {
        title:"Plant Labels",
        description:"Cut window blinds into strips and use them as garden plant markers.",
        tutorialLink:"#",
      },
      {
        title:"Woven Storage Baskets",
        description:"Weave strips of blinds together to create a unique storage basket.",
        tutorialLink:"#",
      },
      {
        title:"Wall Art Strips",
        description:"Paint and arrange blind slats into modern wall art designs.",
        tutorialLink:"#",
      },
    ],
    "old belts":[
      {
        title:"Leather Handle Pulls",
        description:"Repurpose old belts as drawer handles for a rustic touch.",
        tutorialLink:"#",
      },
      {
        title:"Hanging Shelf Straps",
        description:"Use belts to suspend a wooden plank and create a stylish wall shelf.",
        tutorialLink:"#",
      },
      {
        title:"Belt Coasters",
        description:"Cut belts into circles or squares and use them as drink coasters.",
        tutorialLink:"#",
      },
    ],
    "old books":[
      {
        title:"Book Headboard",
        description:"Attach books to a wooden frame to make a one-of-a-kind bed headboard.",
        tutorialLink:"#",
      },
      {
        title:"Rolled Book Page Wreath",
        description:"Roll pages into cone shapes and glue them into a decorative wreath.",
        tutorialLink:"#",
      },
      {
        title:"Book Safe",
        description:"Hollow out a book to create a hidden storage box.",
        tutorialLink:"#",
      },
    ],
    "ice cream stick":[
      {
        title:"Wall Hanging Art",
        description:"Arrange sticks in a geometric pattern for a minimalist wall piece.",
        tutorialLink:"#",
      },
      {
        title:"Bookmark Decorations",
        description:" Paint and personalize sticks to create bookmarks.",
        tutorialLink:"#",
      },
      {
        title:"Miniature Furniture",
        description:"Use popsicle sticks to build tiny chairs, tables, or houses.",
        tutorialLink:"#",
      },
    ],
  };
  
  
  
  
  // Handle form submission and search
  const form = document.getElementById('waste-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
  
    const wasteItems = document.getElementById('waste-items').value.toLowerCase().trim();
    
    // Split the waste items by commas and clean extra spaces
    const wasteArray = wasteItems.split(',').map(item => item.trim());
  
    // Collect matched ideas based on the input
    let matchedIdeas = [];
  
    wasteArray.forEach(waste => {
      if (projectIdeas[waste]) {
        matchedIdeas = matchedIdeas.concat(projectIdeas[waste]);
      }
    });
  
    if (matchedIdeas.length === 0) {
      displayNoIdeasMessage();
    } else {
      displayProjects(matchedIdeas);
    }
  
    document.getElementById('waste-items').value = ''; // Clear input field
  });
  
  // Display matched project ideas
  function displayProjects(ideas) {
    const ideasList = document.getElementById('ideas-list');
    ideasList.innerHTML = ''; // Clear previous ideas
  
    ideas.forEach(project => {
      const projectCard = document.createElement('div');
      projectCard.classList.add('idea-card');
      projectCard.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button onclick="window.location.href='${project.tutorialLink}'">View Tutorial</button>
      `;
      ideasList.appendChild(projectCard);
    });
  }
  
  // Display a message if no matching ideas are found
  function displayNoIdeasMessage() {
    const ideasList = document.getElementById('ideas-list');
    ideasList.innerHTML = '<p>No ideas found. Please try again with different items!</p>';
  }
  
  
  // for signup UserActivation
  // Check if the user is logged in on main page
  auth.onAuthStateChanged(user => {
    if (!user) {
      window.location.href = "signin.html"; // Redirect to signup/login page if not logged in
    }
  });
  
  
  document.getElementById('username-display').innerText = `Welcome, ${localStorage.getItem('username')}!`;
  document.getElementById('credits-display').innerText = `Credits: ${localStorage.getItem('credits')}`;
  
  
  // Assuming you have a function that displays tutorials like this
  function displayTutorials(tutorials) {
    const tutorialList = document.getElementById('tutorial-list');
    tutorialList.innerHTML = ''; // Clear previous results
  
    tutorials.forEach(tutorial => {
      const tutorialElement = document.createElement('div');
      tutorialElement.classList.add('tutorial-card');
  
      tutorialElement.innerHTML = `
        <h3>${tutorial.title}</h3>
        <p>${tutorial.description}</p>
        <a href="${tutorial.link}" target="_blank" class="view-tutorial-link">View Tutorial</a>
      `;
  
      // Add event listener to the tutorial link
      tutorialElement.querySelector('.view-tutorial-link').addEventListener('click', (event) => {
        // Prevent the default link action
        event.preventDefault();
  
        // Open the tutorial in a new tab
        window.open(tutorial.link, '_blank');
  
        // Award credits when the tutorial is viewed
        awardCreditsForViewingTutorial();
      });
  
      tutorialList.appendChild(tutorialElement);
    });
  }
  
  async function awardCreditsForViewingTutorial() {
    // Get current credits from localStorage
    let currentCredits = parseInt(localStorage.getItem('credits')) || 0;
  
    // Award 5 credits when a user views a tutorial
    const updatedCredits = currentCredits + 5;
  
    // Store updated credits in localStorage
    localStorage.setItem('credits', updatedCredits);
  
    // Update the credits displayed on the page
    document.getElementById('credits-display').innerText = `Credits: ${updatedCredits}`;
  
    // Update credits in Firestore (save to user's Firestore document)
    await updateCreditsInFirestore(updatedCredits);
  }
  
  // Function to update credits in Firestore
  async function updateCreditsInFirestore(updatedCredits) {
    const userId = localStorage.getItem('userId'); // Assuming the userId is stored in localStorage
    if (!userId) {
      console.error("User not logged in");
      return;
    }
  
    // Get the Firestore user document reference
    const userRef = doc(db, 'users', userId);
  
    // Update the credits field in Firestore
    await updateDoc(userRef, {
      credits: updatedCredits
    }).then(() => {
      console.log("Credits updated in Firestore");
    }).catch((error) => {
      console.error("Error updating credits in Firestore:", error);
    });
  }
  

window.logout = async function () {
    try {
        await signOut(auth);
        localStorage.removeItem("userId"); // Clear stored user data
        window.location.href = "signin.html"; // Redirect to login page
    } catch (error) {
        console.error("Error logging out:", error.message);
    }
};

  // for adding data
  // let projectIdeas = {};
  
  // fetch('projects.json')
  //   .then(response => response.json())
  //   .then(data => {
  //     projectIdeas = data;
  //   })
  //   .catch(error => console.error("Error loading project ideas:", error));
  
  // Now, the rest of your code remains the same
  