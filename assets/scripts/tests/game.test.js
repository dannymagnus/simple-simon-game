/**
 * @jest-environment jsdom
 */

const { game, newGame, showScore, addTurn, lightsOn, showTurns, playerTurn } = require('../game'); 

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf8');
    document.open();
    document.write(fileContents);
    document.close();
});

describe('game object contains correct keys', () => {
    test('score key object exists', () => {
        expect('score' in game).toBe(true);
    });
    test('currentGame key object exists', () => {
        expect('currentGame' in game).toBe(true);
    });
    test('playerMoves key object exists', () => {
        expect('playerMoves' in game).toBe(true);
    });
    test('choices key object exists', () => {
        expect('choices' in game).toBe(true);
    });
    test('turnNumber key object exists', () => {
        expect('turnNumber' in game).toBe(true);
    });
    test('choices key contains correct ids', () => {
        expect(game.choices).toEqual(['button1','button2','button3','button4']);
    });
});

describe('new game works correctly', () => {
    beforeAll(()=> {
        game.score = 42;
        game.playerMoves = ['keys','legs'];
        game.currentGame = ['bees', 'peas'];
        document.getElementById('score').innerText = 55;
        newGame();
    });
    test('should set the game score to 0', () => {
        expect(game.score).toEqual(0);
    });
    test('should clear the player moves arrays', () => {
        expect(game.playerMoves).toEqual([]);
    });
    test('should be one move in the computer array', () => {
        expect(game.currentGame.length).toEqual(1);
    });
    test('should display 0 for the element with ID of 0',() =>{
        expect(document.getElementById('score').innerText).toEqual(0);
    });
    test('expect data listener to be true', () => {
        const elements = document.getElementsByClassName('circle');
        for (let element of elements){
            expect(element.getAttribute('data-listener')).toEqual('true');
        }
    });
});

describe('gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    });
    test('add a second turn to the game array', () => {
        addTurn();
        expect(game.currentGame.length).toEqual(2);
    });
    test('correct class assigned to button to light up', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    });
    test('showTurns should update the game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    });
    test('should increment the turn if the selection is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    });
});