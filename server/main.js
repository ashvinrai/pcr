import { Meteor } from 'meteor/meteor';

Accounts.onCreateUser(function(options, user) {
  console.log('options', options);
  console.log('user', user);
  return user
});

Meteor.startup(() => {
  parts = [
    {
      amazonUrl: 'https://www.amazon.com/Intel-BX80662G3900-Pentium-G3900-Processor/dp/B01B2PJRPA',
      name: 'Intel Celeron G3900 2.8GHz Dual-Core Processor',
      type: 'cpu',
      price: 42.18
    },
    {
      amazonUrl: 'https://www.amazon.com/M-2-LGA1151-MicroATX-Motherboard-Motherboards/dp/B01H5YC9BQ/ref=sr_1_1?ie=UTF8&qid=1477329759&sr=8-1&keywords=Asus+H110M-A%2FM.2+Micro+ATX+LGA1151+Motherboard',
      name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard',
      type: 'motherboard',
      price: 55.99
    },
    {
      amazonUrl: 'https://www.amazon.com/G-SKILL-PC4-17000-2133MHz-Platform-F4-2133C15S-8GNT/dp/B015FY325A/ref=sr_1_fkmr0_1?ie=UTF8&qid=1477331123&sr=8-1-fkmr0&keywords=G.Skill+NT+Series+8GB+%281+x+8GB%29+DDR4-2400+Memory',
      name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory',
      type: 'memory',
      price: 50.40
    },
    {
      amazonUrl: 'https://www.amazon.com/Hitachi-Ultrastar-A7K1000-3-5-Inch-HUA721050KLA330/dp/B0013E3PEU',
      name: 'Hitachi Ultrastar 500GB 3.5" 7200RPM Internal Hard Drive',
      type: 'storage',
      price: 34.50
    },
    {
      amazonUrl: 'https://www.amazon.com/Rosewill-MicroATX-Tower-Computer-FBM-02/dp/B009NJAE4Q/ref=sr_1_1?ie=UTF8&qid=1477330940&sr=8-1&keywords=Rosewill+FBM-02+MicroATX+Mini+Tower+Case',
      name: 'Rosewill FBM-02 MicroATX Mini Tower Case',
      type: 'case',
      price: 29.01
    },
    {
      amazonUrl: 'https://www.amazon.com/EVGA-WHITE-Warranty-Supply-100-W1-0430-KR/dp/B00H33SDR4/ref=sr_1_1?ie=UTF8&qid=1477331034&sr=8-1&keywords=EVGA+430W+80%2B+Certified+ATX+Power+Supply',
      name: 'EVGA 430W 80+ Certified ATX Power Supply',
      type: 'psu',
      price: 29.85
    },
    {
      amazonUrl: 'https://www.amazon.com/Intel-Pentium-Processor-FC-LGA14C-BX80662G4500/dp/B015VPX190/ref=sr_1_1?ie=UTF8&qid=1477332787&sr=8-1&keywords=Intel+Pentium+G4500+3.5GHz+Dual-Core+Processor',
      name: 'Intel Pentium G4500 3.5GHz Dual-Core Processor',
      type: 'cpu',
      price: 76.40
    },
    {
      amazonUrl: 'https://www.amazon.com/Toshiba-OCZ-Trion-Internal-TRN150-25SAT3-480G/dp/B01B4NUKME/ref=sr_1_1?ie=UTF8&qid=1477332835&sr=8-1&keywords=OCZ+TRION+150+480GB+2.5%22+Solid+State+Drive',
      name: 'OCZ TRION 150 480GB 2.5" Solid State Drive',
      type: 'storage',
      price: 114.68
    }
  ]

  parts.forEach((part, i) => {
    if (!Parts.findOne({name: part.name})) {
      Parts.insert(part);
    }
  })

  builds = [
    {
      cost: 250,
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31y8B2r6IAL._SX300_.jpg',
      parts: {
        cpu: Parts.findOne({name: 'Intel Celeron G3900 2.8GHz Dual-Core Processor'}).name,
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).name,
        memory: Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}).name,
        storage: Parts.findOne({name: 'Hitachi Ultrastar 500GB 3.5" 7200RPM Internal Hard Drive'}).name,
        case: Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}).name,
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).name
      }
    },
    {
      cost: 350,
      imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31y8B2r6IAL._SX300_.jpg',
      parts: {
        cpu: Parts.findOne({name: 'Intel Pentium G4500 3.5GHz Dual-Core Processor'}).name,
        motherboard: Parts.findOne({name: 'Asus H110M-A/M.2 Micro ATX LGA1151 Motherboard'}).name,
        memory: Parts.findOne({name: 'G.Skill NT Series 8GB (1 x 8GB) DDR4-2400 Memory'}).name,
        storage: Parts.findOne({name: 'OCZ TRION 150 480GB 2.5" Solid State Drive'}).name,
        case: Parts.findOne({name: 'Rosewill FBM-02 MicroATX Mini Tower Case'}).name,
        psu: Parts.findOne({name: 'EVGA 430W 80+ Certified ATX Power Supply'}).name
      }
    },
  ]

  builds.forEach((build, i) => {
    if (!Builds.findOne({cost: build.cost})) {
      Builds.insert(build);
    }
  })
});