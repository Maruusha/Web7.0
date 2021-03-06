class ShipController {
  constructor(x,y,spriteName,configs){
    this.sprite = Nakama.playerGroup.create(
      x,
      y,
      "assets",
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5,0.5);
    Nakama.game.physics.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.configs = configs;
    this.timeSinceLastFire = 0;

  }
  update(){
    if(Nakama.keyboard.isDown(this.configs.up)){
      this.sprite.body.velocity.y = - Nakama.configs.shipSpeed;
    }
    else if(Nakama.keyboard.isDown(this.configs.down)){
      this.sprite.body.velocity.y = Nakama.configs.shipSpeed;
    }
    else this.sprite.body.velocity.y=0;
    if(Nakama.keyboard.isDown(this.configs.left)){
      this.sprite.body.velocity.x = - Nakama.configs.shipSpeed;
    }
    else if(Nakama.keyboard.isDown(this.configs.right)){
      this.sprite.body.velocity.x = Nakama.configs.shipSpeed;
    }
    else this.sprite.body.velocity.x=0;
    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;
    if(Nakama.keyboard.isDown(this.configs.fire)
      && this.timeSinceLastFire >= this.configs.cooldown ){
      for(var i=-0.4;i<=0.4;i+=0.2) this.fire(i);
      this.timeSinceLastFire=0;
    }
  }

  fire(direct){
    new BulletController(
      this.sprite.position,
      "BulletType1.png",
      new Phaser.Point(direct,-1)
    );
  }
}
