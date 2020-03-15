new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns:[]
    },
    methods: {
        startGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },

        attack: function(){
            var damage = this.calculateDamage(3,10);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayerAttack: true,
                text: 'Player hits the Monster for ' + damage
            });

            if(this.checkWin()){
                return;
            }

            damage = this.calculateDamage(4,12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayerAttack: false,
                text: 'Monster hits the Player for ' + damage
            });

            this.checkWin();
        },

        specialAttack: function(){
            var damage = this.calculateDamage(7,15);
            this.monsterHealth -= damage;

            this.turns.unshift({
                isPlayerAttack: true,
                text: 'Player hits the Monster hard for ' + damage
            });

            if(this.checkWin()){
                return;
            }

            damage = this.calculateDamage(6,13)
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayerAttack: false,
                text: 'Monster hits the Player for ' + damage
            });

            this.checkWin();
        },

        heal: function(){
            if(this.playerHealth <=90) {
                this.playerHealth += 10
            }
            this.turns.unshift({
                isPlayerAttack: true,
                text: 'Player heals for ' + 10
            });
            this.playerHealth -= this.calculateDamage(4,12);
        },

        giveUp: function(){
            this.gameIsRunning = false;
        },

        calculateDamage: function(min,max){
            return Math.max(Math.floor(Math.random() * max + 1),min);
        },
        checkWin: function(){
            if(this.monsterHealth<=0){
                if(confirm('Vittoria!!! Nuova Partita?')){
                    this.startGame();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }else if(this.playerHealth<=0){
                if(confirm('Sconfitta!!! Nuova Partita?')){
                    this.startGame();
                }else{
                    this.gameIsRunning=false;
                }
                return true;
            }
            return false;
        }
    }
})