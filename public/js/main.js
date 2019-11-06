// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch
    let userButtons = document.querySelectorAll('.u-link'),
        lightBox = document.querySelector('.lightbox');

    function parseUserData(person) {
        let introPara1 = lightBox.querySelector('.lb-para1'),
        introPara2 = lightBox.querySelector('.lb-para2'),
        introPara3 = lightBox.querySelector('.lb-para3');

        let bioContent1 = `
        <img class="lb-image1" src="${person.Content1}">
            <p>${person.Para1}</p>
        `,
        bioContent2 = `
        <img class="lb-image2" src="${person.Content2}">
            <p>${person.Para2}</p>
        `,

        bioContent3 = `
        <img class="lb-image3" src="${person.Content3}">
            <p>${person.Para3}</p>
        `;

        introPara1.innerHTML = bioContent1;
        introPara2.innerHTML = bioContent2;
        introPara3.innerHTML = bioContent3;

        lightBox.classList.add('show-lb');
    }

    function getUserData(event) {
        event.preventDefault();
        //debugger;
        // 1, 2, or 3 depending on which anchor tag you click
        let url = `/${this.getAttribute('href')}`;

        // this goes and fetches the database content (or an API endpoint)
        // that's why it's called a fetch!
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                parseUserData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    userButtons.forEach(button => button.addEventListener("click", getUserData));

    // wire up the lightbox close button
    lightBox.querySelector('.close').addEventListener("click", function() {
        lightBox.classList.remove('show-lb');
    });
})();