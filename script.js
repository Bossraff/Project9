document.addEventListener("DOMContentLoaded", function() {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");
    const darkModeToggle = document.querySelector('.btn-dark-mode');

    function toggleSidebar() {
        sidebar.classList.toggle("collapsed");
    }

    function checkWindowSize() {
        if (window.innerWidth < 992) {
            sidebar.classList.add("collapsed");
        } else {
            sidebar.classList.remove("collapsed");
        }
    }

    sidebarToggle.addEventListener("click", toggleSidebar);
    window.addEventListener("resize", checkWindowSize);

    // Check window size on page load
    checkWindowSize();

    darkModeToggle.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        document.querySelector('.content').classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector("i");
        document.querySelectorAll('.sidebar').forEach(function(sidebar) {
            sidebar.classList.toggle('dark-mode');
        });
        if (document.body.classList.contains("dark-mode")) {
            icon.classList.remove("ri-moon-line");
            icon.classList.add("ri-sun-line");
        } else {
            icon.classList.remove("ri-sun-line");
            icon.classList.add("ri-moon-line");
        }
    });

    // Dropdown item click handling
    $('.dropdown-item').on('click', function() {
        let filterId = $(this).data('filter');
        filterCards(filterId);
    });

    function filterCards(filterId) {
        let cardsArray = [];
        $('.card').each(function() {
            let card = $(this);
            let cardId = card.closest('.col-xl-3, .col-lg-4, .col-md-4, .col-sm-6').attr('data-id');
            let dias = parseInt(card.find(`#dias-${cardId}-${filterId}`).val()) || 0;
            let horas = parseInt(card.find(`#horas-${cardId}-${filterId}`).val()) || 0;
            let minutos = parseInt(card.find(`#minutos-${cardId}-${filterId}`).val()) || 0;
            let segundos = parseInt(card.find(`#segundos-${cardId}-${filterId}`).val()) || 0;
            let totalSeconds = (dias * 86400) + (horas * 3600) + (minutos * 60) + segundos;
            cardsArray.push({ card: card.parent(), totalSeconds: totalSeconds });
        });

        cardsArray.sort((a, b) => a.totalSeconds - b.totalSeconds);
        $('#temporizadores').html('');
        cardsArray.forEach(item => {
            $('#temporizadores').append(item.card);
        });
    }

    $(document).on('click', '.lock', function() {
        const id = $(this).data('id');
        const nomeInput = $(`#nome-${id}`);
        this.classList.toggle('active');
        nomeInput.prop('readonly', !nomeInput.prop('readonly'));
        $(this).find('i').toggleClass('ri-lock-unlock-line ri-lock-line');
    });

    $(document).on('click', '.tempo-input', function() {
        $(this).val('');
        $('.tempo-input').on('blur', function() {
            if ($(this).val() === '') {
                $(this).val(0);
            }
        });
    });

    $(document).on('click', '.btndelete', function() {
        $(this).closest('.col-xl-3').remove();
    });
});







//dashboard
document.getElementById('investment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const investmentAmount = parseFloat(document.getElementById('investmentAmount').value);
    const startDate = new Date(document.getElementById('startDate').value);
    const apy = 0.30;
    const months = 12;
    let totalGrowth = investmentAmount;
    let totalInterest = 0;

    for (let i = 1; i <= months; i++) {
        const interest = totalGrowth * (apy / 12);
        totalGrowth += interest;
        totalInterest += interest;
    }

    document.getElementById('totalGrowth').innerText = `$${totalGrowth.toFixed(2)}`;
    document.getElementById('totalInterest').innerText = `$${totalInterest.toFixed(2)}`;

    // Chart.js logic for growth chart
    const ctx = document.getElementById('growthChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: months }, (_, i) => `Month ${i + 1}`),
            datasets: [{
                label: 'Growth Over Time',
                data: Array.from({ length: months }, (_, i) => investmentAmount * Math.pow(1 + (apy / 12), i + 1)),
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});

