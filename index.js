let faker = require('faker')
let $ = require('jquery')

$('body').on('input', '.inputErrorNumber', function(){
    var value = this.value.replace(/[^0-9\.\,]/g, '');
    if (value < $(this).data('min')) {
        this.value = $(this).data('min');
    } else if (value > $(this).data('max')) {
        this.value = $(this).data('max');
    } else {
        this.value = value;
    }
});

faker.locale = "en_US";

const range = document.querySelector('.inputErrorRange');
const field = document.querySelector('.inputErrorNumber');
const seed = document.querySelector('.inputSeedNumber');
const main = document.querySelector('.main');
let table, header, idRow, randIdRow, fullnameRow, addressRow, telephoneRow;

let createdrows = 0;

range.addEventListener('input', function (e) {
    field.value = e.target.value;
});
field.addEventListener('input', function (e) {
    range.value = e.target.value;
});

window.randomizeSeed = function() {
    seed.value = faker.datatype.number(false);
    changeTable();
}

function applyErrors(entries, errors) {
    for (let i = 0; i < errors; i++) {
        let index = faker.mersenne.rand(entries.length, 0);
        let entry = entries[index];
        let indexToChange = faker.mersenne.rand(entry.length - 1, 0);
        let addingSymbol;
        if (faker.mersenne.rand(10, 0) < 6){
            addingSymbol = faker.mersenne.rand(9, 0)
        }else addingSymbol = faker.lorem.word().charAt(0);
        if (faker.datatype.number() < 33333) {
            if (errors - i < 1) {
                if (faker.mersenne.rand(100, 0) < i * 100) {
                    entry = entry.slice(0, indexToChange) + entry.slice(indexToChange + 1);
                }
            }
            entry = entry.slice(0, indexToChange) + entry.slice(indexToChange + 1);
        } else if (faker.datatype.number() < 66666) {
            if (errors - i < 1) {
                if (faker.mersenne.rand(100, 0) < i * 100) {
                    entry = entry.slice(0, indexToChange) + addingSymbol + entry.slice(indexToChange + 1);
                }
            }
            entry = entry.slice(0, indexToChange) + addingSymbol + entry.slice(indexToChange + 1);
        } else {
            if (errors - i < 1) {
                if (faker.mersenne.rand(100, 0) < i * 100) {
                    entry = entry.slice(0, indexToChange) + entry[indexToChange + 1] + entry.slice(indexToChange);
                }
            }
            entry = entry.slice(0, indexToChange) + entry[indexToChange + 1] + entry.slice(indexToChange);
        }
        entries[index] = entry;
    }
    return entries;
}

function printTable() {
    table = returnTableHeader();
    document.body.insertAdjacentElement("beforeend", table);
}

function returnTableHeader() {
    table = document.createElement('table');
    table.id = 'myTable'
    header = document.createElement('tr')
    idRow = document.createElement('td');
    randIdRow = document.createElement('td')
    fullnameRow = document.createElement('td');
    addressRow = document.createElement('td');
    telephoneRow = document.createElement('td');
    idRow.textContent = "ID";
    randIdRow.textContent = "Random User Identifier";
    fullnameRow.textContent = "Full name";
    addressRow.textContent = "Address";
    telephoneRow.textContent = "Telephone number";
    header.appendChild(idRow);
    header.appendChild(randIdRow);
    header.appendChild(fullnameRow);
    header.appendChild(addressRow);
    header.appendChild(telephoneRow);
    table.appendChild(header);
    return table;
}

function createTable() {
    let row, id, randId, fullname, address, telephone;
    let errors = document.getElementsByClassName('inputErrorNumber')[0].value;
    faker.locale = getSelectedRadio();
    let entries = [];
    for (let i = 0; i < 20; i++) {
        row = document.createElement('tr');
        id = document.createElement('td');
        randId = document.createElement('td')
        fullname = document.createElement('td');
        address = document.createElement('td');
        telephone = document.createElement('td');
        id.textContent = i.toString();
        randId.textContent = faker.datatype.number();
        entries[0] = faker.name.findName();
        entries[1] = faker.address.state() + ' ';
        entries[2] = faker.address.cityName() + ' ';
        entries[3] = faker.address.streetAddress(true);
        entries[4] = faker.phone.phoneNumberFormat();
        entries = applyErrors(entries, errors);
        fullname.textContent = entries[0];
        address.textContent = entries[1] + entries[2] + entries[3];
        telephone.textContent = entries[4];
        row.appendChild(id);
        row.appendChild(randId);
        row.appendChild(fullname);
        row.appendChild(address);
        row.appendChild(telephone);
        table.appendChild(row);
        createdrows++;
    }
}

printTable();
createTable();

function fillTableWith10(createdrows) {
    let row, id, randId, fullname, address, telephone;
    let errors = document.getElementsByClassName('inputErrorNumber')[0].value;
    faker.locale = getSelectedRadio();
    let entries = [];
    faker.seed(parseInt(getSeed() + ((createdrows / 10))));
    for (let i = 0; i < 10; i++) {
        row = document.createElement('tr');
        id = document.createElement('td');
        randId = document.createElement('td')
        fullname = document.createElement('td');
        address = document.createElement('td');
        telephone = document.createElement('td');
        id.textContent = (i + parseInt(createdrows)).toString();
        randId.textContent = faker.datatype.number();
        entries[0] = faker.name.findName();
        entries[1] = faker.address.state() + ' ';
        entries[2] = faker.address.cityName() + ' ';
        entries[3] = faker.address.streetAddress(true);
        entries[4] = faker.phone.phoneNumberFormat();
        entries = applyErrors(entries, errors);
        fullname.textContent = entries[0];
        address.textContent = entries[1] + entries[2] + entries[3];
        telephone.textContent = entries[4];
        row.appendChild(id);
        row.appendChild(randId);
        row.appendChild(fullname);
        row.appendChild(address);
        row.appendChild(telephone);
        table.appendChild(row);
    }
}

function recreateTable() {
    table.remove();
    printTable();
    createTable();
}

function getSelectedRadio() {
    const radios = document.getElementsByName('location');

    for (let i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            return (radios[i].value);
        }
    }
}

function configureFaker(seed, locale) {
    createdrows = 0;
    faker.seed(parseInt(seed));
    faker.locale = locale;
}

function getSeed() {
    return document.getElementsByClassName('inputSeedNumber')[0].value;
}

function changeTable() {
    let locale = getSelectedRadio();
    let seed = getSeed();
    configureFaker(seed, locale);
    recreateTable()
}

main.addEventListener('change', function () {
    changeTable();
});

function populate() {
    while (true) {
        let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;
        if (windowRelativeBottom > document.documentElement.clientHeight + 1) break;
        fillTableWith10(createdrows);
        createdrows += 10;
    }
}

window.addEventListener('scroll', populate);

populate();