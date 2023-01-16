function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            heroHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return {width: this.monsterHealth + '%'};
        },
        heroBarStyles() {
            if (this.heroHealth < 0) {
                return { width: '0%' };
            }
            return {width: this.heroHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        heroHealth(value)  {
            if (value <= 0 && this.monsterHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.heroHealth <= 0) {
                this.winner = 'draw';
            } else if (value <= 0) {
                this.winner = 'hero';
            }
        }
    },
    methods: {
        startGame() {
            this.heroHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = Math.floor(Math.random() * (12 - 5)) + 5;
            this.monsterHealth -= attackValue;
            this.addLogMessage('hero', 'attack', attackValue);
            this.attackHero();
        },
        attackHero() {
            const attackValue = Math.floor(Math.random() * (15 - 8)) + 8;
            this.heroHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('hero', 'attack', attackValue);
            this.attackHero();
        },
        healHero() {
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if (this.heroHealth + healValue > 100) {
                this.heroHealth = 100;
            } else {
            this.heroHealth += healValue;
            }
            this.addLogMessage('hero', 'heal', healValue);
            this.attackHero();
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            });
        }
    }
});

app.mount('#game');