async function sprintChallenge5() { // Note the async keyword, in case you wish to use `await` inside sprintChallenge5
  // 👇 WORK WORK BELOW THIS LINE 👇
  
  async function fetchData(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

  function buildLearnerCard(learner) {
    const card = document.createElement('div');
    card.classList.add('card');

    const nameHeader = document.createElement('h3');
    nameHeader.textContent = `${learner.fullName}, ID ${learner.id}`;

    const emailDiv = document.createElement('div');
    emailDiv.textContent = learner.email;

    const mentorHeader = document.createElement('h4');
    mentorHeader.classList.add('closed');
    mentorHeader.textContent = 'Mentors';

    const mentorList = document.createElement('ul');
    mentorList.classList.add('mentor-list');
    learner.mentors.forEach(mentor => {
        const mentorItem = document.createElement('li');
        mentorItem.textContent = mentor;
        mentorList.appendChild(mentorItem);
    });

    mentorHeader.addEventListener('click', () => {
        mentorHeader.classList.toggle('open');
        mentorHeader.classList.toggle('closed');
        
    });

    const idElement = document.createElement('p'); 
    idElement.classList.add('id-info');
    idElement.style.display = 'none'; 
    idElement.textContent = `ID ${learner.id}`; 

    card.appendChild(nameHeader);
    card.appendChild(emailDiv);
    card.appendChild(mentorHeader);
    card.appendChild(mentorList);

    
   
    const infoElement = document.querySelector('body > header > p.info');
    
    
    card.addEventListener('click', evt => {
      const isSelected = card.classList.contains('selected');
      
      document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('selected');
      });
      if (!isSelected) {
        card.classList.add('selected');
        idElement.style.display = 'block';
        nameHeader.textContent = `${learner.fullName}, ID ${learner.id}`;
      } else {
        card.classList.remove('selected');
        idElement.style.display = 'none';
        nameHeader.textContent = learner.fullName;
      }
      if (card.classList.contains('selected')) {
          infoElement.textContent = learner ? `The selected learner is ${learner.fullName}` : 'No learner is selected';
      } else {
          infoElement.textContent = 'No learner is selected';
      }
    });

    return card;
}
document.addEventListener('DOMContentLoaded', async () => {
  const infoElement = document.querySelector('body > header > p.info');
  infoElement.textContent = 'No learner is selected';

  const learnersData = await fetchData('http://localhost:3003/api/learners');
  const mentorsData = await fetchData('http://localhost:3003/api/mentors');

  if (learnersData && mentorsData) {
      const learnersWithMentors = learnersData.map(learner => {
          return {
              ...learner,
              mentors: learner.mentors.map(mentorID => {
                  const mentor = mentorsData.find(mentor => mentor.id === mentorID);
                  return mentor ? `${mentor.firstName} ${mentor.lastName}` : `Unknown Mentor ${mentorID}`;
              })
          };
      });

      const cardsContainer = document.querySelector('.cards');

      learnersWithMentors.forEach(learner => {
          const card = buildLearnerCard(learner);
          cardsContainer.appendChild(card);
      });
  }
});


  const footer = document.querySelector('footer')
  const currentYear = new Date().getFullYear()
  footer.textContent = `© BLOOM INSTITUTE OF TECHNOLOGY ${currentYear}`

  // 👆 WORK WORK ABOVE THIS LINE 👆
}

// ❗ DO NOT CHANGE THE CODE  BELOW
if (typeof module !== 'undefined' && module.exports) module.exports = { sprintChallenge5 }
else sprintChallenge5()
