// Helper to create elements
function createElement(tag, className = '', text = '') {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text) el.textContent = text;
  return el;
}

// Add field handler
function addField(section) {
  const div = document.createElement('div');
  div.classList.add('group');

  switch (section) {
    case 'education':
      div.innerHTML = `
        <input type="text" placeholder="Degree" class="edu-degree" />
        <input type="text" placeholder="Institution" class="edu-inst" />
        <input type="text" placeholder="Year" class="edu-year" />
      `;
      document.getElementById('education-section').appendChild(div);
      break;

    case 'experience':
      div.innerHTML = `
        <input type="text" placeholder="Job Title" class="exp-role" />
        <input type="text" placeholder="Company" class="exp-company" />
        <input type="text" placeholder="Duration" class="exp-duration" />
        <textarea placeholder="Responsibilities" class="exp-desc"></textarea>
      `;
      document.getElementById('experience-section').appendChild(div);
      break;

    case 'project':
      div.innerHTML = `
        <input type="text" placeholder="Project Title" class="proj-title" />
        <textarea placeholder="Description" class="proj-desc"></textarea>
        <input type="text" placeholder="Technologies Used" class="proj-tech" />
        <input type="text" placeholder="Link (optional)" class="proj-link" />
      `;
      document.getElementById('project-section').appendChild(div);
      break;

    case 'skills':
      div.innerHTML = `<input type="text" placeholder="Skill" class="skills-input" />`;
      document.getElementById('skills-section').appendChild(div);
      break;

    case 'language':
      div.innerHTML = `<input type="text" placeholder="Language & Proficiency" class="lang-input" />`;
      document.getElementById('language-section').appendChild(div);
      break;

    case 'certification':
      div.innerHTML = `
        <input type="text" placeholder="Title" class="cert-title" />
        <input type="text" placeholder="Authority" class="cert-auth" />
        <input type="text" placeholder="Date" class="cert-date" />
      `;
      document.getElementById('certification-section').appendChild(div);
      break;
  }
}

// Generate Resume Preview
document.getElementById('resume-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const linkedin = document.getElementById('linkedin').value;
  const github = document.getElementById('github').value;
  const address = document.getElementById('address').value;

  // Personal Info
  document.getElementById('preview-name').textContent = name;
  document.getElementById('preview-email').textContent = email;
  document.getElementById('preview-phone').textContent = phone;
  document.getElementById('preview-address').textContent = address;
  document.getElementById('preview-links').textContent = `${linkedin ? linkedin + ' | ' : ''}${github}`;

  // Education
  const eduHTML = Array.from(document.querySelectorAll('.edu-degree')).map((el, i) => {
    const degree = el.value;
    const inst = document.querySelectorAll('.edu-inst')[i].value;
    const year = document.querySelectorAll('.edu-year')[i].value;
    return `<p><strong>${degree}</strong> at ${inst} (${year})</p>`;
  }).join('');
  document.getElementById('preview-education').innerHTML = `<h3>Education</h3>${eduHTML}`;

  // Experience
  const expHTML = Array.from(document.querySelectorAll('.exp-role')).map((el, i) => {
    const role = el.value;
    const comp = document.querySelectorAll('.exp-company')[i].value;
    const dur = document.querySelectorAll('.exp-duration')[i].value;
    const desc = document.querySelectorAll('.exp-desc')[i].value;
    return `<p><strong>${role}</strong> at ${comp} (${dur})<br>${desc}</p>`;
  }).join('');
  document.getElementById('preview-experience').innerHTML = `<h3>Experience</h3>${expHTML}`;

  // Projects
  const projHTML = Array.from(document.querySelectorAll('.proj-title')).map((el, i) => {
    const title = el.value;
    const desc = document.querySelectorAll('.proj-desc')[i].value;
    const tech = document.querySelectorAll('.proj-tech')[i].value;
    const link = document.querySelectorAll('.proj-link')[i].value;
    return `<p><strong>${title}</strong> (${tech})<br>${desc} ${link ? `<a href="${link}" target="_blank">[Link]</a>` : ''}</p>`;
  }).join('');
  document.getElementById('preview-projects').innerHTML = `<h3>Projects</h3>${projHTML}`;

  // Skills
  const skillsHTML = Array.from(document.querySelectorAll('.skills-input'))
    .map(skill => `<li>${skill.value}</li>`).join('');
  document.getElementById('preview-skills').innerHTML = `<h3>Skills</h3><ul>${skillsHTML}</ul>`;

  // Languages
  const langsHTML = Array.from(document.querySelectorAll('.lang-input'))
    .map(lang => `<li>${lang.value}</li>`).join('');
  document.getElementById('preview-languages').innerHTML = `<h3>Languages</h3><ul>${langsHTML}</ul>`;

  // Certifications
  const certHTML = Array.from(document.querySelectorAll('.cert-title')).map((el, i) => {
    const title = el.value;
    const auth = document.querySelectorAll('.cert-auth')[i].value;
    const date = document.querySelectorAll('.cert-date')[i].value;
    return `<p><strong>${title}</strong> - ${auth} (${date})</p>`;
  }).join('');
  document.getElementById('preview-certifications').innerHTML = `<h3>Certifications</h3>${certHTML}`;
});

// PDF Download
function downloadPDF() {
  const element = document.getElementById("resume-content");
  const opt = {
    margin:       0.5,
    filename:     'Resume.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2 },
    jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().from(element).set(opt).save();
}
