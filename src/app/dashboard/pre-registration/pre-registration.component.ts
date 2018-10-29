import { Component, OnInit } from '@angular/core';
import { LFEvent } from '../models/event.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Character } from '../models/character.interface';
import { PreRegistrationService } from '../services/pre-registration.service';
import { CharacterDropDown } from '../models/character-drop-down';
import { PreRegistrationPlayerInfo } from '../models/pre-registration-player-character-info';
import { CharacterService } from '../services/character.service';
import { Cart } from '../models/cart';
import { Player } from '../models/player.interface';
import { CartItem } from '../models/cart-item';
import { Token } from '../models/token.interface';
import { CheckOutService } from '../services/check-out.service';

@Component({
  selector: 'app-pre-registration',
  templateUrl: './pre-registration.component.html',
  styleUrls: ['./pre-registration.component.css']
})

export class PreRegistrationComponent implements OnInit {
  
  amount: number = 0;
  xpAmount: number = 0;
  characterAmount: number = 0;
  stripe_key = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' // todo: get production key when publishing
  userName = '';
  event: LFEvent;
  preRegistrationForm: FormGroup;
  charactersToRegister = new Array<Character>();
  availableCharacters = new Array<Character>();
  playersCharacters: Array<Character>;
  characterDropDowns = new Array<CharacterDropDown>();
  nextIndex = 0;
  availableVolunteerPoints = 0;
  preRegistrationPlayerInfo: PreRegistrationPlayerInfo;
  eventId = 0;
  player: Player;
  requestFailure: boolean = false;
  errors: string = '';
  worked: boolean;
  cartKey: string;
    
  constructor(
    private preRegistrationService: PreRegistrationService, 
    private characterService: CharacterService,
    private checkOutService: CheckOutService
    ) { }

  ngOnInit() {
    this.event = new LFEvent();
    this.event.title = 'Some event I\'ll get from the database later';
    this.preRegistrationForm = new FormGroup({});

    this.preRegistrationService.getLoggedInPlayer()
      .subscribe(player => {
        this.player = player;
        this.availableVolunteerPoints = player.volunteerPoints;

        this.characterService.getPlayersCharacters(player.id)
          .subscribe(playersCharacters => {
            this.availableCharacters = playersCharacters;
            this.availableCharacters = playersCharacters;
            this.addCharacter();
          });
      });
  }

  addCharacter() {
    if (this.characterDropDowns.length == 0) this.characterAmount += 40;
    else this.characterAmount += 10;

    this.amount = this.characterAmount + this.xpAmount;

    var controlName = 'character' + this.nextIndex;
    var paidXpControlName = 'paidXp' + this.nextIndex;
    var vpToXpControlName = 'vpToXp' + this.nextIndex;

    var characterDropDown = new CharacterDropDown();
    characterDropDown.characterList = this.availableCharacters;
    characterDropDown.controlName = controlName;
    characterDropDown.paidXpControlName = paidXpControlName;
    characterDropDown.vpToXpControlName = vpToXpControlName;

    this.characterDropDowns.push(characterDropDown);
    this.nextIndex++;

    this.preRegistrationForm.addControl(controlName, 
      new FormControl('', {
        validators: [Validators.required]
      })
    );
    this.preRegistrationForm.addControl(vpToXpControlName, 
      new FormControl('', {
        validators: [Validators.required, Validators.max(20)]
      })
    );
    this.preRegistrationForm.addControl(paidXpControlName, 
      new FormControl('', {
        validators: [Validators.required, Validators.max(20)]
      })
    );

    this.preRegistrationForm.get(vpToXpControlName).setValue(0);
    this.preRegistrationForm.get(paidXpControlName).setValue(0); 
  }

  updateCharacterDropDowns(selectedDropDown: CharacterDropDown, selectedCharacter: Character) {
    if (selectedDropDown.selectedCharacter != null && (selectedDropDown.selectedCharacter.id === selectedCharacter.id)) return;
    var replacedCharacter = selectedDropDown.selectedCharacter;

    this.characterDropDowns.forEach(dropDown => {
      if (dropDown.controlName === selectedDropDown.controlName) {
        dropDown.selectedCharacter = selectedCharacter;
      } else {
        dropDown.characterList = dropDown.characterList.filter(c => c.id !== selectedCharacter.id);
        if (replacedCharacter != null) dropDown.characterList.push(replacedCharacter);
      }
    });

    this.availableCharacters = this.availableCharacters.filter(a => a.id !== selectedCharacter.id);
    if (replacedCharacter != null) this.availableCharacters.push(replacedCharacter);
  }
  
  deleteCharacter(dropDown: CharacterDropDown) {
    if (this.characterDropDowns.length === 1) this.characterAmount -= 40;
    else this.characterAmount -= 10;

    this.amount = this.characterAmount + this.xpAmount;

    this.preRegistrationForm.removeControl(dropDown.controlName);
    this.preRegistrationForm.removeControl(dropDown.vpToXpControlName);
    this.preRegistrationForm.removeControl(dropDown.paidXpControlName);

    this.characterDropDowns = this.characterDropDowns.filter(cd => cd.controlName !== dropDown.controlName);
    var selectedCharacter = dropDown.selectedCharacter;

    if (selectedCharacter != null){
      this.availableCharacters.push(selectedCharacter);
      this.characterDropDowns.forEach(dropDown => {
        dropDown.characterList.push(selectedCharacter);
      });
    } 

    this.updateVpTotal();
    this.updateXpTotal();

  }
  updateXpTotal() {
    var xpAmount = 0;
    this.characterDropDowns.forEach(dropDown => {
      var paidXp = this.preRegistrationForm.get(dropDown.paidXpControlName).value;
      xpAmount += paidXp;
    });
    this.xpAmount = xpAmount;
    this.amount = this.characterAmount + this.xpAmount;
  }

  updateVpTotal() {
    var availableVolunteerPoints = this.player.volunteerPoints;
    
    this.characterDropDowns.forEach(dropDown => {
      var spentVp = this.preRegistrationForm.get(dropDown.vpToXpControlName).value;
      availableVolunteerPoints = availableVolunteerPoints - spentVp;
    });
    this.availableVolunteerPoints = availableVolunteerPoints;
  }

  checkout() {
    var cart = new Cart();
    var cartItems: CartItem[] = [];
    cart.eventId = this.eventId;
    cart.playerId = this.player.id;
    cart.cartItems = cartItems;

    this.characterDropDowns.forEach(dropDown => {
      var cartItem = new CartItem();
      var characterId = this.preRegistrationForm.get(dropDown.controlName).value;
      var vpToXp = this.preRegistrationForm.get(dropDown.vpToXpControlName).value;
      var purchaseXp = this.preRegistrationForm.get(dropDown.paidXpControlName).value;

      cartItem.characterId = characterId;
      cartItem.vpToXp = vpToXp;
      cartItem.purchaseXp = purchaseXp;

      cart.cartItems.push(cartItem);
    });

    // TODO: actually move on to checkout when cart is made 
    var success = false;
    this.requestFailure = false;
    this.preRegistrationService.createCart(cart)
      .subscribe(
        cartKey => {
          this.cartKey = cartKey;
          this.openCheckout();
        },
        error => {
          this.requestFailure = true;
          this.errors = error;
        });
  }

  isXpOver20(controlName: string): boolean {
    return this.preRegistrationForm.get(controlName).value > 20;
  }

  required(controlName: string): boolean {
    var errors = this.preRegistrationForm.get(controlName).errors;
    if (errors == null) return false;
    else {
      return errors.required;
    }
  }

  openCheckout() {
    var handler = (<any>window).StripeCheckout.configure({
      key: this.stripe_key,
      billingAddress: true,
      locale: 'auto',
      token: token => {
        var model = new Token();
        model.id = token.id;
        model.cartKey = this.cartKey;
        this.checkOutService.checkOut(model)
          .subscribe(
            () =>  {
              this.worked = true;
            },
            error => {
              this.requestFailure = true;
              this.errors = error;
            });
      }
    });

    handler.open({
      name: 'Last Frontier',
      description: 'Game {#} Checkout', // todo: add actual event number here
      amount: this.amount * 100
    });

  }
}
