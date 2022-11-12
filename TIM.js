const oldRadmirHud = {
     data: {
          hudEl: null,
          moneyEl: null,
          hpEl: {
               value: null,
               progress: null,
          },
          armourEl: {
               value: null,
               progress: null,
          },
          hungerEl: {
               value: null,
               progress: null,
          },
          breathEl: {
               wrapper: null,
               value: null,
               progress: null,
          },
          wanted: {
               wrapper: null,
               els: []
          },
          weaponEl: {
               ammoEl: null,
               icon: null,
          },
          server: {
               wrapper: null,
               image: null
          },
          bonusEl: null,
          greenZoneEl: null,
     },
     createHud(hudEl) {
          this.data.hudEl = hudEl.querySelector('.OLD-RADMIR-hud');
          this.data.moneyEl = hudEl.querySelector('#OLD-RADMIR-cash__value');
          [this.data.hpEl.progress, this.data.hpEl.value] = [hudEl.querySelector('.OLD-RADMIR-param__health .OLD-RADMIR-progress__value'), hudEl.querySelector('.OLD-RADMIR-param__health .OLD-RADMIR-param__amount')];
          [this.data.armourEl.progress, this.data.armourEl.value] = [hudEl.querySelector('.OLD-RADMIR-param__armour .OLD-RADMIR-progress__value'), hudEl.querySelector('.OLD-RADMIR-param__armour .OLD-RADMIR-param__amount')];
          [this.data.hungerEl.progress, this.data.hungerEl.value] = [hudEl.querySelector('.OLD-RADMIR-param__hunger .OLD-RADMIR-progress__value'), hudEl.querySelector('.OLD-RADMIR-param__hunger .OLD-RADMIR-param__amount')];
          [this.data.breathEl.wrapper, this.data.breathEl.progress, this.data.breathEl.value] = [hudEl.querySelector('.OLD-RADMIR-param__breath'), hudEl.querySelector('.OLD-RADMIR-param__breath .OLD-RADMIR-progress__value'), hudEl.querySelector('.OLD-RADMIR-param__breath .OLD-RADMIR-param__amount')];
          [this.data.wanted.wrapper, this.data.wanted.els] = [hudEl.querySelector('.OLD-RADMIR-hud__wanted'), hudEl.querySelector('.OLD-RADMIR-wanted__row').children];
          this.data.weaponEl.ammoEl = hudEl.querySelector('.OLD-RADMIR-weapon__ammo').children;
          this.data.server.wrapper = hudEl.querySelector('.OLD-RADMIR-logo');
          this.data.server.image = this.data.server.wrapper.children[0]
          this.data.bonusEl = hudEl.querySelector('.OLD-RADMIR-logo__bonus');
          this.data.greenZoneEl = hudEl.querySelector('.OLD-RADMIR-green-zone');
          this.data.weaponEl.icon = hudEl.querySelector('.OLD-RADMIR-weapon__icon');

          this.data.hudEl.style.transform = `scale(${this.getScale()})`;
          this.data.server.wrapper.style.transform = `scale(${this.getScale()})`;
          this.data.greenZoneEl.style.transform = `scale(${this.getScale()})`;
     },
     getScale() {
          const { clientWidth, clientHeight } = document.documentElement;
          return (clientWidth + clientHeight) / (1920 + 1080)
     },
     onInfoChange(prop, value) {
          if ((prop == 'show' || prop == 'showBars') && +value >= 1) {
               this.data.hudEl.style.display = '';
          }

          if ((prop == 'show' || prop == 'showBars') && +value === 0) {
               this.data.hudEl.style.display = 'none';
          }

          if (prop == 'weapon') {
               this.data.weaponEl.icon.src = window.oldRadmirConfig.weapon[value];
          }

          if (prop === 'weapon' && value >= 16) {
               this.data.weaponEl.ammoEl[0].style.display = '';
               this.data.weaponEl.ammoEl[1].style.display = '';
          }

          if (prop === 'weapon' && value < 16) {
               this.data.weaponEl.ammoEl[0].style.display = 'none';
               this.data.weaponEl.ammoEl[1].style.display = 'none';
          }

          if (prop == 'showGreenZoneTab') {
               this.data.greenZoneEl.style.display = '';
          }

          if (prop == 'hideGreenZoneTab') {
               this.data.greenZoneEl.style.display = 'none';
          }

          if (prop == 'health') {
               this.data.hpEl.progress.style.width = `${value}%`;
               this.data.hpEl.value.innerText = value;
          }

          if (prop == 'armour') {
               this.data.armourEl.progress.style.width = `${value}%`;
               this.data.armourEl.value.innerText = value;
          }

          if (prop == 'hunger') {
               this.data.hungerEl.progress.style.width = `${value}%`;
               this.data.hungerEl.value.innerText = value;
          }

          if (prop == 'breath') {
               if (value < 99) this.data.breathEl.wrapper.style.display = ''
               else this.data.breathEl.wrapper.style.display = 'none'

               this.data.breathEl.progress.style.width = `${value}%`;
               this.data.breathEl.value.innerText = value;
          }

          if (prop == 'money') {
               this.data.moneyEl.innerHTML = value.toLocaleString('DE');
          }

          if (prop == 'wanted') {
               if (value === 0 && !oldRadmirConfig.wantedAlwaysShow) {
                    this.data.wanted.wrapper.style.display = 'none';
                    return;
               }

               this.data.wanted.wrapper.style.display = '';

               for (let i = 0; i < 6; i += 1) {
                    if ((5 - i) / value >= 1 || (5 - i == 0 && value == 0)) {
                         this.data.wanted.els[i].src = window.oldRadmirConfig.icons.inactive_wanted;
                         this.data.wanted.els[i].className = 'OLD-RADMIR-wanted__inactive'
                    }
                    else {
                         this.data.wanted.els[i].src = window.oldRadmirConfig.icons.active_wanted;
                         this.data.wanted.els[i].className = 'OLD-RADMIR-wanted__active'
                    }
               }
          }

          if (prop == 'ammoInClip') {
               this.data.weaponEl.ammoEl[0].innerText = value;
          }

          if (prop == 'totalAmmo') {
               this.data.weaponEl.ammoEl[1].innerText = value;
          }

          if (prop == 'setServer') {
               if (value <= 0) return this.data.server.wrapper.style.display = 'none';

               if (value > 0 && this.data.server.wrapper.style.display == 'none') this.data.server.wrapper.style.display = '';

               this.data.server.image.src = window.oldRadmirConfig.logo[value];
          }

          if (prop == 'setBonus') {
               if (value <= 1) this.data.bonusEl.style.display = 'none';
               else this.data.bonusEl.style.display = '';

               this.data.bonusEl.innerText = `x${value}`;
          }
     },
     setStyles() {
          const style = document.createElement('style');
          style.innerHTML = `#app .hud-radmir-wanted{display:none}.OLD-RADMIR-logo{position:absolute;right:4vh;top:3vh;transform-origin:top right}.OLD-RADMIR-logo__image{width:200px}.OLD-RADMIR-logo__bonus{background:radial-gradient(93.1% 93.1% at 126.72% 6.9%,#eb00ff 0,#eb00ff00 100%),linear-gradient(129.39deg,#f5be09 30.88%,#e9651b 98.06%);width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:16px;color:#fff;font-weight:700;position:absolute;bottom:-5px;right:-2px;border-radius:50%;font-style:italic;font-weight:900}.OLD-RADMIR-hud{transform-origin:right bottom;position:absolute;right:0;top:20px}.OLD-RADMIR-weapon__back{position:absolute;right:45px;top:106px}.OLD-RADMIR-weapon__icon{position:absolute;right:62px;top:121px}.OLD-RADMIR-weapon__ammo{position:absolute;right:90px;top:220px;color:#fff;width:80px;text-align:center}.OLD-RADMIR-weapon__ammo #OLD-RADMIR-ammo__in-clip{font-family:GothamPro;font-weight:900;font-style:italic;font-size:25px;margin-right:8px;text-shadow:0 0 5px #00000080}.OLD-RADMIR-weapon__ammo #OLD-RADMIR-ammo__total{font-family:GothamPro;font-weight:300;font-style:italic;font-size:18px;text-shadow:0 0 5px #000000b3}.OLD-RADMIR-hud .OLD-RADMIR-hud__cash{position:absolute;right:240px;top:138px;display:inline-flex;align-items:center}.OLD-RADMIR-cash__icon{margin-right:13px;margin-top:1px}.OLD-RADMIR-hud__cash #OLD-RADMIR-cash__value{font-family:GothamPro;font-weight:900;font-style:italic;color:#fff;display:inline-block;font-size:28px;text-shadow:0 0 5px #00000080}.OLD-RADMIR-hud .OLD-RADMIR-hud__params{width:170px;position:absolute;top:180px;right:255px}.OLD-RADMIR-param__armour,.OLD-RADMIR-param__breath,.OLD-RADMIR-param__hunger{margin-top:10px}.OLD-RADMIR-param{display:inline-flex;align-items:center}.OLD-RADMIR-param__icon{margin-right:12px}.OLD-RADMIR-param__progress,.OLD-RADMIR-progress__value{width:100px;height:5px;background-color:#0000004d;border-radius:5px}.OLD-RADMIR-progress__value{border-radius:5px}.OLD-RADMIR-param__circle{float:right;margin-top:-2.5px;margin-right:-3px}.OLD-RADMIR-param__amount{font-family:GothamPro;font-weight:300;font-style:italic;margin-left:10px;width:35px;text-align:left;color:#fff;font-size:18px;text-shadow:0 0 5px #000000b3}.OLD-RADMIR-param__health{margin-left:20px}.OLD-RADMIR-param__health .OLD-RADMIR-progress__value{width:50%;background-color:#ed2e2e;box-shadow:rgba(237,46,46,.5) 0 0 5px 0}.OLD-RADMIR-param__armour{margin-left:14px}.OLD-RADMIR-param__armour .OLD-RADMIR-param__icon{margin-right:13px}.OLD-RADMIR-param__armour .OLD-RADMIR-progress__value{width:50%;background-color:#526ee6;box-shadow:rgba(82,110,230,.5) 0 0 5px 0}.OLD-RADMIR-param__hunger{margin-left:1px}.OLD-RADMIR-param__hunger .OLD-RADMIR-progress__value{width:50%;box-shadow:hsl(26deg 100% 59% / 30%) 0 0 5px 0;background-color:#ff872e}.OLD-RADMIR-param__breath{margin-left:3px}.OLD-RADMIR-param__breath .OLD-RADMIR-progress__value{width:99%;background-color:#fff;box-shadow:rgba(255,255,255,.5) 0 0 5px 0}.OLD-RADMIR-hud__wanted{position:absolute;right:70px;top:250px}.OLD-RADMIR-wanted__back{position:absolute;right:0;top:25px}.OLD-RADMIR-wanted__row{display:flex;flex-direction:row;position:absolute;right:15px;top:32px}.OLD-RADMIR-wanted__row>img{padding:2px 3px 2px 3px}.OLD-RADMIR-hud__wanted--always-show .OLD-RADMIR-wanted__inactive{opacity:.3}.OLD-RADMIR-green-zone{position:absolute;left:3.2vw;bottom:23vh;display:flex;align-items:center}.OLD-RADMIR-green-zone__image{margin-right:10px}.OLD-RADMIR-green-zone__text{color:#fff;text-shadow:3px 3px 5px #00000080}.OLD-RADMIR-green-zone__text div:first-child{font-size:13px;font-weight:900;text-transform:uppercase}.OLD-RADMIR-green-zone__text div:last-child{color:hsl(0deg 0% 100% / 70%);font-size:12px;font-weight:500;margin-top:5px}`;
          document.head.appendChild(style);
     },
     setNewStyles(styles) {
          const style = document.createElement('style');
          style.innerHTML = styles;
          document.head.appendChild(style);
     },
     init() {
          if (typeof window.oldRadmirConfig === 'undefined') {
               setTimeout(() => { this.init() }, 500);

               jsLoader.log.makeLog('OLD_RADMIR_HUD', '[hud init] Assets not found!');
               return;
          }

          if (App.$data.zFriks !== window.innerHeight * window.innerWidth * 32 || window.oldRadmirConfig.type === 'local') {
               jsLoader.utils.createDialog(0, 'Ошибка', '', '', 'Закрыть', '<div style="display: flex;flex-direction: column;align-items: center;font-size:12px;gap: 20px;color: hsl(39deg 100% 50%);">Файлы сборки были нарушены, запуск невозможен. <img style="width: 340px;height: 293px" src="https://media.tenor.com/ciJ1l8Q_nnEAAAAd/gta-oh-no.gif"></img></div>');
               return;
          }

          this.setStyles();
          this.setNewStyles(window.oldRadmirConfig.style);

          const hudHtml = `<div class="OLD-RADMIR-logo"> <img src="newAssets/logo/1.png" class="OLD-RADMIR-logo__image"> <div class="OLD-RADMIR-logo__bonus">x2</div> </div> <div class="OLD-RADMIR-hud"> <div class="OLD-RADMIR-hud__weapon"> <img src="${window.oldRadmirConfig.icons.weapon_back}" alt="" class="OLD-RADMIR-weapon__back"> <img src="newAssets/weapon/0.png" alt="" class="OLD-RADMIR-weapon__icon"> <div class="OLD-RADMIR-weapon__ammo"> <span id="OLD-RADMIR-ammo__in-clip">1</span> <span id="OLD-RADMIR-ammo__total">1</span> </div> </div> <div class="OLD-RADMIR-hud__cash"> <img src="${window.oldRadmirConfig.icons.cash}" alt="" class="OLD-RADMIR-cash__icon"> <div id="OLD-RADMIR-cash__value">0</div> </div> <div class="OLD-RADMIR-hud__params"> <div class="OLD-RADMIR-param__health OLD-RADMIR-param"> <img src="${window.oldRadmirConfig.icons.health}" alt="" class="OLD-RADMIR-param__icon"> <div class="OLD-RADMIR-param__progress"> <div class="OLD-RADMIR-progress__value"> <img src="${window.oldRadmirConfig.icons.circle}" alt="" class="OLD-RADMIR-param__circle"> </div> </div> <span class="OLD-RADMIR-param__amount">50</span> </div> <div class="OLD-RADMIR-param__armour OLD-RADMIR-param"> <img src="${window.oldRadmirConfig.icons.armour}" alt="" class="OLD-RADMIR-param__icon"> <div class="OLD-RADMIR-param__progress"> <div class="OLD-RADMIR-progress__value"> <img src="${window.oldRadmirConfig.icons.circle}" alt="" class="OLD-RADMIR-param__circle"> </div> </div><span class="OLD-RADMIR-param__amount">0</span> </div> <div class="OLD-RADMIR-param__hunger OLD-RADMIR-param"> <img src="${window.oldRadmirConfig.icons.hunger}" alt="" class="OLD-RADMIR-param__icon"> <div class="OLD-RADMIR-param__progress"> <div class="OLD-RADMIR-progress__value"> <img src="${window.oldRadmirConfig.icons.circle}" alt="" class="OLD-RADMIR-param__circle"> </div> </div><span class="OLD-RADMIR-param__amount">0</span> </div> <div class="OLD-RADMIR-param__breath OLD-RADMIR-param"> <img src="${window.oldRadmirConfig.icons.breath}" alt="" class="OLD-RADMIR-param__icon"> <div class="OLD-RADMIR-param__progress"> <div class="OLD-RADMIR-progress__value"> <img src="${window.oldRadmirConfig.icons.circle}" alt="" class="OLD-RADMIR-param__circle"> </div> </div><span class="OLD-RADMIR-param__amount">99</span> </div> </div> <div class="OLD-RADMIR-hud__wanted"> <img src="${window.oldRadmirConfig.icons.wanted_back}" alt="" class="OLD-RADMIR-wanted__back"> <div class="OLD-RADMIR-wanted__row"> <img src="${window.oldRadmirConfig.icons.active_wanted}" alt="" class="OLD-RADMIR-wanted__inactive"> <img src="${window.oldRadmirConfig.icons.active_wanted}" alt="" class="OLD-RADMIR-wanted__inactive"> <img src="${window.oldRadmirConfig.icons.active_wanted}" alt="" class="OLD-RADMIR-wanted__inactive"> <img src="${window.oldRadmirConfig.icons.active_wanted}" alt="" class="OLD-RADMIR-wanted__active"> <img src="${window.oldRadmirConfig.icons.active_wanted}" alt="" class="OLD-RADMIR-wanted__active"> <img src="${window.oldRadmirConfig.icons.active_wanted}" alt="" class="OLD-RADMIR-wanted__active"> </div> </div> </div> <div class="OLD-RADMIR-green-zone"> <img src="${window.oldRadmirConfig.icons.zone}" alt="" class="OLD-RADMIR-green-zone__image"> <div class="OLD-RADMIR-green-zone__text"> <div>Безопасная зона</div> <div>Вы находитесь в безопасной зоне.</div> </div> </div>`
          const newHud = jsLoader.hud.addNewHud(hudHtml, 'OLD-RADMIR', (prop, value) => void this.onInfoChange(prop, value));

          this.createHud(newHud);

          interface('Hud').setBonus(interface('Hud').bonus);
          interface('Hud').setServer(interface('Hud').server);
          interface('Hud').info.health = interface('Hud').info.health;
          interface('Hud').info.armour = interface('Hud').info.armour;
          interface('Hud').info.hunger = interface('Hud').info.hunger;
          interface('Hud').info.breath = interface('Hud').info.breath;
          interface('Hud').info.ammoInClip = interface('Hud').info.ammoInClip;
          interface('Hud').info.totalAmmo = interface('Hud').info.totalAmmo;
          interface('Hud').info.money = interface('Hud').info.money;
          interface('Hud').info.wanted = 0;
          interface('Hud').info.weapon = interface('Hud').info.weapon;
          interface('Hud').info.show = 0;
          interface('Hud').hideGreenZoneTab();

          if (App.scriptName.length > 0) jsLoader.showConnectedScript('info', App.scriptName, 'Загружен!');

          jsLoader.log.makeLog('OLD_RADMIR_HUD', '[hud init] Inited!');
     }
}

oldRadmirHud.init();