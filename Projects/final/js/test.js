this.bloodSugar = {
  initial: this.random(2, 3),
  displayed: undefined,
};

this.rate = {
  decrease: -0.005,
  increase: 0.01,
  rapidIncrease: 0.02,
  zero: 0,
};

//display status of symptoms
//set up first BG reading
this.bloodSugar.displayed = this.bloodSugar.initial;
//baseline BG decreasing
this.metabolism(this.rate.decrease, this.rate.zero);
this.updateBloodSugarDisplay();

if (this.bloodSugar.displayed < this.bloodSugar.initial) {
  if (this.checkOscar) {
    this.symptoms.setVisible(checkOscar);
    //start with severe hypoglycemia <= 2.8
    if (this.bloodSugar.initial <= BLOODSUGAR.severeLow) {
      this.symptoms.text = "Help! Oscar has fainted!!";
    }
    //start with moderate hypoglycemia <= 3.5
    else if (this.bloodSugar.initial <= BLOODSUGAR.low) {
      this.symptoms.text = "Oscar is feeling dizzy and drowsy";
    }
    //start with light hypoglycemia <= 3.5
    else if (this.bloodSugar.initial <= BLOODSUGAR.hypoglycemia) {
      this.symptoms.text = "Oscar is feeling hungry and nauseous";
    }
  }
}
//if BG improving from initial
else if (this.bloodSugar.displayed > this.bloodSugar.initial) {
  if (this.checkOscar) {
    this.symptoms.setVisible(checkOscar);
    this.symptoms.text = "Oscar is feeling better!!";
  }
}

//treat hypoglycemia
//if BG < or = 2.8, severe hypoglycemia
if (bloodSugar.displayed < BLOODSUGAR.severeLow) {
  //if overlap with juice
  if (this.giveJuice) {
    this.response.text =
      "This is an emergency! Oscar is unconscious, he can't drink juice!";
    this.response.setVisible(this.giveJuice);
  }

  if (this.giveGlucagon) {
    this.metabolism(this.rate.zero, this.rate.increase);
    this.updateBloodSugarDisplay();

    this.symptoms.text = "Oscar will feel better soon!!";
  }
} else {
  //if juice given
  if (this.giveJuice) {
    this.metabolism(this.rate.zero, this.rate.rapidIncrease);
    this.updateBloodSugarDisplay();

    this.response.text = "Check Oscar's blood sugar is increasing again";
    this.response.setVisible(this.giveJuice);
  }

  //if glucagon given
  if (this.giveGlucagon) {
    this.response.text =
      "*****It is not that bad! There is no need for glucagon.****";
    this.response.setVisible(this.giveGlucagon);
  }
}

// --------------------------

//if BG < or = 2.8, severe hypoglycemia
if (this.bloodSugarValue < BLOODSUGAR.severeLow) {
  //baseline BG decrease rate
  this.metabolism(-0.005, 0);

  //if overlap with glucometer
  if (this.checkOscar) {
    this.symptoms.text = "Help! Oscar has fainted!!";
  }

  //if overlap with juice
  if (this.giveJuice) {
    this.response.text =
      "This is an emergency! Oscar is unconscious, he can't drink juice!";
    this.response.setVisible(this.giveJuice);
  }

  //if overlap with glucagon
  if (this.giveGlucagon) {
    this.metabolism(0, 0.03);
    this.updateBloodSugarDisplay();
    this.symptoms.text = "Oscar will feel better soon!!";
    this.glucagon.setVisible(false);
  }
}
//if BG > 2.8 but not good enough to win
else if (
  this.bloodSugarValue >= BLOODSUGAR.severeLow &&
  this.bloodSugarValue < BLOODSUGAR.good
) {
  this.metabolism(-0.005, 0.001);
  //if check Oscar with glucometer
  if (this.checkOscar) {
    //if severely low blood sugar
    if (this.bloodSugarValue <= BLOODSUGAR.low) {
      this.symptoms.text = "Oscar is feeling dizzy and drowsy";
    }
    //if blood sugar low
    else if (this.bloodSugarValue <= BLOODSUGAR.hypoglycemia) {
      this.symptoms.text = "Oscar is feeling hungry and nauseous";
    }
    //if blood sugar > 4
    else this.symptoms.text = "Oscar is feeling a lot better";
  }

  //if juice given
  if (this.giveJuice) {
    this.metabolism(0, 0.01);
    this.updateBloodSugarDisplay();

    this.response.text = "Check Oscar's blood sugar is increasing again";
    this.response.setVisible(true);
  }

  //if glucagon given
  if (this.giveGlucagon) {
    this.response.text =
      "*****It is not that bad! There is no need for glucagon.****";
    this.response.setVisible(true);
  }
}
