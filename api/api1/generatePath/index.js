
/*
module.exports = async function (context, req) {
  context.log('💡 Received request to generate learning path');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
    return;
  }

  const { name, skills, interests } = req.body || {};

  if (!name || !skills || !interests) {
    context.res = {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
      body: { error: 'Missing name, skills, or interests in request body.' }
    };
    return;
  }

  const learningPath = `
Hello ${name}!

Based on your skills (${skills.join(', ')}) and interests (${interests.join(', ')}), here's a personalized learning path for you:

1. Strengthen your foundation in ${skills[0]}.
2. Dive deeper into topics related to ${interests[0]}.
3. Build a project that combines ${skills[1] || skills[0]} with ${interests[1] || interests[0]}.
4. Explore advanced resources in ${interests.join(', ')}.
5. Keep practicing and track your progress!

Happy Learning! 🌱
`;

  context.res = {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Content-Type': 'application/json'
    },
    body: { learningPath }
  };
};
*/

module.exports = async function (context, req) {
  context.log('💡 Received request to generate learning path');

  // CORS preflight support
  if (req.method === 'OPTIONS') {
    context.res = {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
    return;
  }

  const { name, skills, interests } = req.body || {};

  if (!name || !skills || !interests) {
    context.res = {
      status: 400,
      headers: {
        'Access-Control-Allow-Origin': 'http://localhost:5173',
      },
      body: { error: 'Missing name, skills, or interests in request body.' }
    };
    return;
  }

  const learningPath = `
Hello ${name}!

Based on your skills (${skills.join(', ')}) and interests (${interests.join(', ')}), here's a personalized learning path for you:

1. Strengthen your foundation in ${skills[0]}.
2. Dive deeper into topics related to ${interests[0]}.
3. Build a project that combines ${skills[1] || skills[0]} with ${interests[1] || interests[0]}.
4. Explore advanced resources in ${interests.join(', ')}.
5. Keep practicing and track your progress!

🎓 Recommended Learning Resources:
`;

  const resources = {
    javascript: {
      title: "JavaScript",
      link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
      youtube: "https://www.youtube.com/watch?v=PkZNo7MFNFg"
    },
    html: {
      title: "HTML",
      link: "https://www.w3schools.com/html/",
      youtube: "https://www.youtube.com/watch?v=pQN-pnXPaVg"
    },
    css: {
      title: "CSS",
      link: "https://www.w3schools.com/css/",
      youtube: "https://www.youtube.com/watch?v=yfoY53QXEnI"
    },
    react: {
      title: "React",
      link: "https://react.dev/learn",
      youtube: "https://www.youtube.com/watch?v=bMknfKXIFA8"
    },
    nodejs: {
      title: "Node.js",
      link: "https://nodejs.dev/en/learn",
      youtube: "https://www.youtube.com/watch?v=RLtyhwFtXQA"
    },
    mongodb: {
      title: "MongoDB",
      link: "https://www.mongodb.com/developer/",
      youtube: "https://www.youtube.com/watch?v=Of1l1Y1VFmY"
    },
    python: {
      title: "Python",
      link: "https://www.learnpython.org/",
      youtube: "https://www.youtube.com/watch?v=_uQrJ0TkZlc"
    },
    sql: {
      title: "SQL",
      link: "https://www.codecademy.com/learn/learn-sql",
      youtube: "https://www.youtube.com/watch?v=27axs9dO7AE"
    },
    aws: {
      title: "AWS",
      link: "https://aws.amazon.com/training/",
      youtube: "https://www.youtube.com/watch?v=ulprqHHWlng"
    },
    dsa: {
      title: "Data Structures & Algorithms",
      link: "https://www.geeksforgeeks.org/data-structures/",
      youtube: "https://www.youtube.com/watch?v=RBSGKlAvoiM"
    },
    ai: {
      title: "AI",
      link: "https://www.freecodecamp.org/news/learn-ai-for-free/",
      youtube: "https://www.youtube.com/watch?v=8V20oXy1vFQ"
    },
    "machine learning": {
      title: "Machine Learning",
      link: "https://www.coursera.org/learn/machine-learning",
      youtube: "https://www.youtube.com/watch?v=GwIo3gDZCVQ"
    },
    figma: {
      title: "Figma",
      link: "https://www.figma.com/resources/learn-design/",
      youtube: "https://www.youtube.com/watch?v=FTFaQWZBqQ8"
    }
  };

  const userTopics = [...skills, ...interests].map(s => s.toLowerCase());
  const used = new Set();

  const matchedResources = userTopics
    .filter(topic => resources[topic] && !used.has(topic) && used.add(topic))
    .map(topic => resources[topic]);

  context.res = {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Content-Type': 'application/json'
    },
    body: {
      learningPath: learningPath.trim(),
      resources: matchedResources
    }
  };
};
