import { Meteor } from 'meteor/meteor';

Meteor.users.allow({
  update: function (userId, user, fields, modifier) {
    // can only change your own documents
    if(user._id === userId)
    {
      Meteor.users.update({_id: userId}, modifier);
      return true;
    }
    else return false;
  }
});

Accounts.onCreateUser(function(options, user) {
  console.log('options', options);
  console.log('user', user);
  return user
});

Builds.find({}).forEach((build) => {
	Builds.remove(build._id);
})

Meteor.methods({
  'chargeCard': function(stripeToken, data) {
    var Stripe = StripeAPI('sk_test_FmGP5PQrdaUbHzh4rEHVaCdS');

    Stripe.charges.create({
      amount: data.amount,
      currency: 'usd',
      source: stripeToken
    }, Meteor.bindEnvironment(function(err, charge) {
      console.log(err, charge);
      data.time = Date.now();
      data.amount /= 100;
      Contributions.insert(data)  
    }));
  }
});

Meteor.startup(() => {
  parts = [
    {
      amazonUrl: 'https://www.amazon.com/Rosewill-MicroATX-Tower-Computer-FBM-02/dp/B009NJAE4Q/ref=sr_1_1?ie=UTF8&qid=1477330940&sr=8-1&keywords=Rosewill+FBM-02+MicroATX+Mini+Tower+Case',
      name: 'Rosewill FBM-02 MicroATX Mini Tower Case',
      type: 'case',
      price: 29.01
    },
	{
      amazonUrl: 'https://www.amazon.com/Corsair-Carbide-Silent-Quiet-Tower/dp/B00RORBQSW',
      name: 'Corsair Carbide Series 100R Quiet Mid Tower Case',
      type: 'case',
      price: 49.99
    },
	{
      amazonUrl: 'https://www.amazon.com/Phanteks-Eclipse-Silent-Anthracite-PH-EC416PSC_AG/dp/B01BLY9UEU',
      name: 'Phanteks Eclipse Series P400S ATX Tower Case',
      type: 'case',
      price: 79.99
    },
	{
      amazonUrl: 'https://www.amazon.com/Corsair-Carbide-Clear-Compact-Mid-Tower/dp/B017XPP9KK',
      name: 'Corsair Carbide Clear Mid-Tower Case',
      type: 'case',
      price: 98.11
    },
	{
      amazonUrl: 'http://www.newegg.com/Product/Product.aspx?Item=9SIA4UF2DZ6565',
      name: 'Cryorig H7 Tower Cooler',
      type: 'cooler',
      price: 29.90
    },
	{
      amazonUrl: 'https://www.amazon.com/Noctua-NH-D15-heatpipe-NF-A15-140mm/dp/B00L7UZMAK',
      name: 'Noctua NH-D15 Cooler',
      type: 'cooler',
      price: 87.99
    },
    {
      amazonUrl: 'https://www.amazon.com/Intel-BX80662G3900-Pentium-G3900-Processor/dp/B01B2PJRPA',
      name: 'Intel Celeron G3900 2.8GHz Dual-Core Processor',
      type: 'cpu',
      price: 42.18
    },
	{
      amazonUrl: 'https://www.amazon.com/Intel-BX80662G4400-Pentium-Processor-FCLGA1151/dp/B015VPX05A',
      name: 'Intel Pentium G4400 3.3 GHz Dual-Core Processor',
      type: 'cpu',
      price: 59.98
    },
    {
      amazonUrl: 'https://www.amazon.com/Intel-Pentium-Processor-FC-LGA14C-BX80662G4500/dp/B015VPX190/ref=sr_1_1?ie=UTF8&qid=1477332787&sr=8-1&keywords=Intel+Pentium+G4500+3.5GHz+Dual-Core+Processor',
      name: 'Intel Pentium G4500 3.5GHz Dual-Core Processor',
      type: 'cpu',
      price: 76.40
    },
	{
      amazonUrl: 'https://www.amazon.com/Intel-i3-6100-Cache-Processor-BX80662I36100/dp/B015VPX2EO',
      name: 'Intel Core i3-6100 3.7 GHz Dual-Core Processor',
      type: 'cpu',
      price: 104.99
    },
	{
      amazonUrl: 'https://www.amazon.com/Intel-Skylake-Desktop-Processor-BX80662I56500/dp/B010T6CWI2',
      name: 'Intel Core i5-6500 3.2 GHz Quad-Core Processor',
      type: 'cpu',
      price: 191.91
    },
	{
      amazonUrl: 'http://www.newegg.com/Product/Product.aspx?Item=N82E16819117561',
      name: 'Intel Core i5-6600K 3.5 GHz Quad-Core Processor',
      type: 'cpu',
      price: 219.99
    },
	{
      amazonUrl: 'https://www.amazon.com/Intel-Unlocked-Skylake-Processor-BX80662I76700K/dp/B012M8LXQW',
      name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor',
      type: 'cpu',
      price: 328.99
    },
	{
      amazonUrl: 'https://www.amazon.com/EVGA-GeForce-GAMING-Support-04G-P4-6253-KR/dp/B01MF7EQJZ',
      name: 'EVGA GeForce GTX 1050 Ti 4GB GDDR5 Graphics Card',
      type: 'gpu',
      price: 144.99
    },
	{
      amazonUrl: 'https://www.amazon.com/EVGA-GeForce-Support-Graphics-06G-P4-6163-KR/dp/B01IPVSLTC',
      name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card',
      type: 'gpu',
      price: 259.99
    },
	{
      amazonUrl: 'https://www.amazon.com/EVGA-GeForce-Support-Graphics-08G-P4-6173-KR/dp/B01GX5YWAO',
      name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card',
      type: 'gpu',
      price: 407.99
    },
	{
      amazonUrl: 'https://www.amazon.com/EVGA-GeForce-Support-Graphics-08G-P4-6286-KR/dp/B01GAI64GO',
      name: 'EVGA GeForce GTX 1080 8GB GDDR5 Graphics Card',
      type: 'gpu',
      price: 764.99
    },
    {
      amazonUrl: 'https://www.amazon.com/G-SKILL-PC4-17000-2133MHz-Platform-F4-2133C15S-8GNT/dp/B015FY325A/ref=sr_1_fkmr0_1?ie=UTF8&qid=1477331123&sr=8-1-fkmr0&keywords=G.Skill+NT+Series+8GB+%281+x+8GB%29+DDR4-2400+Memory',
      name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory',
      type: 'memory',
      price: 50.40
    },
	{
      amazonUrl: 'https://www.amazon.com/Corsair-Vengeance-3000MHz-PC4-24000-Memory/dp/B0134EW7G8?th=1',
      name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory',
      type: 'memory',
      price: 106.48
    },
    {
      amazonUrl: 'https://www.amazon.com/M-2-LGA1151-MicroATX-Motherboard-Motherboards/dp/B01H5YC9BQ/ref=sr_1_1?ie=UTF8&qid=1477329759&sr=8-1&keywords=Asus+H110M-A%2FM.2+Micro+ATX+LGA1151+Motherboard',
      name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard',
      type: 'motherboard',
      price: 55.99
    },
	{
      amazonUrl: 'https://www.amazon.com/Asus-Motherboard-ATX-LGA1151-Socket/dp/B0126R2T44',
      name: 'Asus Z170-A ATX LGA1151 Motherboard',
      type: 'motherboard',
      price: 108.95
    },
    {
      amazonUrl: 'https://www.amazon.com/EVGA-WHITE-Warranty-Supply-100-W1-0430-KR/dp/B00H33SDR4/ref=sr_1_1?ie=UTF8&qid=1477331034&sr=8-1&keywords=EVGA+430W+80%2B+Certified+ATX+Power+Supply',
      name: 'EVGA 430W 80+ Certified ATX Power Supply',
      type: 'psu',
      price: 29.85
    },
	{
      amazonUrl: 'https://www.amazon.com/Corsair-RM650x-Modular-Supply-Certified/dp/B015YEIBJ8',
      name: 'Corsair RMx 650W Power Supply',
      type: 'psu',
      price: 109.99
    },
    {
      amazonUrl: 'https://www.amazon.com/Hitachi-Ultrastar-A7K1000-3-5-Inch-HUA721050KLA330/dp/B0013E3PEU',
      name: 'Hitachi Ultrastar 500GB 3.5" 7200RPM Internal Hard Drive',
      type: 'storage',
      price: 34.50
    },
    {
      amazonUrl: 'https://www.amazon.com/Toshiba-OCZ-Trion-Internal-TRN150-25SAT3-480G/dp/B01B4NUKME/ref=sr_1_1?ie=UTF8&qid=1477332835&sr=8-1&keywords=OCZ+TRION+150+480GB+2.5%22+Solid+State+Drive',
      name: 'OCZ TRION 150 480GB 2.5" Solid State Drive',
      type: 'storage',
      price: 114.68
    },
	{
      amazonUrl: 'https://www.amazon.com/Samsung-2-5-Inch-Internal-MZ-75E500B-AM/dp/B00OBRE5UE',
      name: 'Samsung 850 EVO 500GB 2.5" Solid State Drive',
      type: 'storage',
      price: 129.99
    }
  ]

  parts.forEach((part, i) => {
    if (!Parts.findOne({name: part.name})) {
      Parts.insert(part);
    }
  })

  builds = [
    {
      imageUrl: 'caseimages/RosewillFBM02.jpg',
      parts: {
		case: Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}),
        cpu: Parts.findOne({name: 'Intel Celeron G3900 2.8GHz Dual-Core Processor'}),
        memory: Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}),
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}),
        storage: Parts.findOne({name: 'Hitachi Ultrastar 500GB 3.5" 7200RPM Internal Hard Drive'})
      },
	  //May God have mercy on my soul for the code I'm about to write, but I can't figure out another way to do this. Trying to reference the already-established parts directly causes a crash, and trying to reference the parts hash instead targets the total parts list.
	  cost: (Parts.findOne({name: 'Intel Celeron G3900 2.8GHz Dual-Core Processor'}).price + Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}).price + Parts.findOne({name: 'Hitachi Ultrastar 500GB 3.5" 7200RPM Internal Hard Drive'}).price + Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}).price + Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).price).toFixed(2)
    },
    {
      imageUrl: 'caseimages/RosewillFBM02.jpg',
      parts: {
        case: Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}),
        cpu: Parts.findOne({name: 'Intel Pentium G4500 3.5GHz Dual-Core Processor'}),
        memory: Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}),
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Pentium G4500 3.5GHz Dual-Core Processor'}).price + Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}).price + Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/RosewillFBM02.jpg',
      parts: {
        case: Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}),
        cpu: Parts.findOne({name: 'Intel Pentium G4400 3.3 GHz Dual-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1050 Ti 4GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}),
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Pentium G4500 3.5GHz Dual-Core Processor'}).price + Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}).price + Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1050 Ti 4GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/CorsairCarbide100R.jpg',
      parts: {
        case: Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}),
		cpu: Parts.findOne({name: 'Intel Core i3-6100 3.7 GHz Dual-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1050 Ti 4GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}),
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i3-6100 3.7 GHz Dual-Core Processor'}).price + Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}).price + Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1050 Ti 4GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/CorsairCarbide100R.jpg',
      parts: {
		case: Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}),
        cpu: Parts.findOne({name: 'Intel Core i3-6100 3.7 GHz Dual-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i3-6100 3.7 GHz Dual-Core Processor'}).price + Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}).price + Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/CorsairCarbide100R.jpg',
      parts: {
        case: Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}),
        cpu: Parts.findOne({name: 'Intel Core i5-6500 3.2 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i5-6500 3.2 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}).price + Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/CorsairCarbide100R.jpg',
      parts: { 
        case: Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}),
		cooler: Parts.findOne({name: 'Cryorig H7 Tower Cooler'}),
        cpu: Parts.findOne({name: 'Intel Core i5-6600K 3.5 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i5-6600K 3.5 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Cryorig H7 Tower Cooler'}).price + Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Corsair Carbide Series 100R Quiet Mid Tower Case'}).price + Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/PhanteksEclipse.jpg',
      parts: { 
        case: Parts.findOne({name: 'Phanteks Eclipse Series P400S ATX Tower Case'}),
		cooler: Parts.findOne({name: 'Cryorig H7 Tower Cooler'}),
        cpu: Parts.findOne({name: 'Intel Core i5-6600K 3.5 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'Corsair RMx 650W Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i5-6600K 3.5 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Cryorig H7 Tower Cooler'}).price + Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Phanteks Eclipse Series P400S ATX Tower Case'}).price + Parts.findOne({name: 'Corsair RMx 650W Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1060 6GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/PhanteksEclipse.jpg',
      parts: { 
        case: Parts.findOne({name: 'Phanteks Eclipse Series P400S ATX Tower Case'}),
		cooler: Parts.findOne({name: 'Cryorig H7 Tower Cooler'}),
        cpu: Parts.findOne({name: 'Intel Core i5-6600K 3.5 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'Corsair RMx 650W Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i5-6600K 3.5 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Cryorig H7 Tower Cooler'}).price + Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Phanteks Eclipse Series P400S ATX Tower Case'}).price + Parts.findOne({name: 'Corsair RMx 650W Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/PhanteksEclipse.jpg',
      parts: { 
        case: Parts.findOne({name: 'Phanteks Eclipse Series P400S ATX Tower Case'}),
		cooler: Parts.findOne({name: 'Cryorig H7 Tower Cooler'}),
        cpu: Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'Corsair RMx 650W Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Cryorig H7 Tower Cooler'}).price + Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Phanteks Eclipse Series P400S ATX Tower Case'}).price + Parts.findOne({name: 'Corsair RMx 650W Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/CorsairCarbideClear.jpg',
      parts: { 
        case: Parts.findOne({name: 'Corsair Carbide Clear Mid-Tower Case'}),
		cooler: Parts.findOne({name: 'Noctua NH-D15 Cooler'}),
        cpu: Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'Corsair RMx 650W Power Supply'}),
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Noctua NH-D15 Cooler'}).price + Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Corsair Carbide Clear Mid-Tower Case'}).price + Parts.findOne({name: 'Corsair RMx 650W Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/CorsairCarbideClear.jpg',
      parts: { 
        case: Parts.findOne({name: 'Corsair Carbide Clear Mid-Tower Case'}),
		cooler: Parts.findOne({name: 'Noctua NH-D15 Cooler'}),
        cpu: Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'Corsair RMx 650W Power Supply'}),
        storage: Parts.findOne({name: 'Samsung 850 EVO 500GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Noctua NH-D15 Cooler'}).price + Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'Samsung 850 EVO 500GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Corsair Carbide Clear Mid-Tower Case'}).price + Parts.findOne({name: 'Corsair RMx 650W Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1070 8GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
	{
      imageUrl: 'caseimages/CorsairCarbideClear.jpg',
      parts: { 
        case: Parts.findOne({name: 'Corsair Carbide Clear Mid-Tower Case'}),
		cooler: Parts.findOne({name: 'Noctua NH-D15 Cooler'}),
        cpu: Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}),
		gpu: Parts.findOne({name: 'EVGA GeForce GTX 1080 8GB GDDR5 Graphics Card'}),
        memory: Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}),
        motherboard: Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}),
        psu: Parts.findOne({name: 'Corsair RMx 650W Power Supply'}),
        storage: Parts.findOne({name: 'Samsung 850 EVO 500GB 2.5" Solid State Drive'})
      },
	  cost: (Parts.findOne({name: 'Intel Core i7-6700K 4.0 GHz Quad-Core Processor'}).price + Parts.findOne({name: 'Noctua NH-D15 Cooler'}).price + Parts.findOne({name: 'Asus Z170-A ATX LGA1151 Motherboard'}).price + Parts.findOne({name: 'Corsair Vengeance LPX 16GB (2 x 8GB) DDR4-3000 Memory'}).price + Parts.findOne({name: 'Samsung 850 EVO 500GB 2.5" Solid State Drive'}).price + Parts.findOne({name: 'Corsair Carbide Clear Mid-Tower Case'}).price + Parts.findOne({name: 'Corsair RMx 650W Power Supply'}).price + Parts.findOne({name: 'EVGA GeForce GTX 1080 8GB GDDR5 Graphics Card'}).price).toFixed(2)
    },
  ]

  builds.forEach((build, i) => {
    if (!Builds.findOne({cost: build.cost})) {
      Builds.insert(build);
    }
  })
});