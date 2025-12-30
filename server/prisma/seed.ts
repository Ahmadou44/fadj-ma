import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const PHARMACY_NAMES = [
    "Pharmacie Centrale", "Pharmacie du Plateau", "Pharmacie des Mamelles", "Pharmacie Cheikh Anta Diop",
    "Pharmacie de la Corniche", "Pharmacie Mermoz", "Pharmacie Fann", "Pharmacie Point E",
    "Pharmacie Medina", "Pharmacie Gueule Tapee", "Pharmacie Ouakam", "Pharmacie Ngor",
    "Pharmacie Yoff", "Pharmacie Almadies", "Pharmacie VDN", "Pharmacie Sacre Coeur",
    "Pharmacie Liberte", "Pharmacie Dieuppeul", "Pharmacie Castors", "Pharmacie HLM"
];

const DRUGS_DB = [
    { name: 'Doliprane 1000mg', form: 'Comprimé', class: 'Antalgique', price: 1000 },
    { name: 'Doliprane 500mg', form: 'Gélule', class: 'Antalgique', price: 500 },
    { name: 'Efferalgan 1g', form: 'Effervescent', class: 'Antalgique', price: 1200 },
    { name: 'Spasfon', form: 'Comprimé', class: 'Antispasmodique', price: 1800 },
    { name: 'Amoxicilline 1g', form: 'Comprimé', class: 'Antibiotique', price: 2500 },
    { name: 'Augmentin 1g', form: 'Sachet', class: 'Antibiotique', price: 4500 },
    { name: 'Vitamin C Upsa', form: 'Effervescent', class: 'Vitamine', price: 1500 },
    { name: 'Bion 3', form: 'Comprimé', class: 'Vitamine', price: 6000 },
    { name: 'Smecta', form: 'Sachet', class: 'Digestion', price: 2000 },
    { name: 'Maalox', form: 'Sirop', class: 'Digestion', price: 2200 },
    { name: 'Gaviscon', form: 'Sachet', class: 'Digestion', price: 3000 },
    { name: 'Ibuprofène 400mg', form: 'Comprimé', class: 'Anti-inflammatoire', price: 1000 },
    { name: 'Advil 400mg', form: 'Comprimé', class: 'Anti-inflammatoire', price: 1800 },
    { name: 'Voltarène', form: 'Pommade', class: 'Anti-inflammatoire', price: 2500 },
    { name: 'Fervex', form: 'Sachet', class: 'Grippe', price: 1500 },
    { name: 'Humex Rhume', form: 'Comprimé', class: 'Grippe', price: 2000 },
    { name: 'Lysopaïne', form: 'Pastille', class: 'Maux de gorge', price: 1800 },
    { name: 'Strepsils', form: 'Pastille', class: 'Maux de gorge', price: 2200 },
    { name: 'Vogalib', form: 'Lyophilisat', class: 'Nausée', price: 3500 },
    { name: 'Imodium', form: 'Gélule', class: 'Diarrhée', price: 1200 },
    { name: 'Betadine Jaune', form: 'Flacon', class: 'Antiseptique', price: 1500 },
    { name: 'Biseptine', form: 'Spray', class: 'Antiseptique', price: 2000 },
    { name: 'Dafalgan Codeine', form: 'Comprimé', class: 'Antalgique', price: 1400 },
    { name: 'Tramadol 50mg', form: 'Gélule', class: 'Antalgique', price: 1600 },
    { name: 'Zyrtec', form: 'Comprimé', class: 'Allergie', price: 2200 },
    { name: 'Aerius', form: 'Comprimé', class: 'Allergie', price: 2800 },
    { name: 'Ventoline', form: 'Spray', class: 'Asthme', price: 3000 },
    { name: 'Seretide', form: 'Spray', class: 'Asthme', price: 12000 },
    { name: 'Kardegic 75mg', form: 'Sachet', class: 'Cardio', price: 1800 },
    { name: 'Tahor 10mg', form: 'Comprimé', class: 'Cholestérol', price: 5000 },
    // Add more as needed...
];

async function main() {
    console.log('Start seeding simulation data...');

    // delete all existing data
    await prisma.stock.deleteMany();
    await prisma.pharmacy.deleteMany();
    await prisma.user.deleteMany();
    await prisma.drug.deleteMany();

    // 1. Create Pharmacies
    const pharmacies = [];
    for (let i = 0; i < PHARMACY_NAMES.length; i++) {
        const lat = 14.6928 + (Math.random() - 0.5) * 0.1; // Random around Dakar center
        const lng = -17.4467 + (Math.random() - 0.5) * 0.1;

        const user = await prisma.user.create({
            data: {
                phone: `77000${1000 + i}`,
                password: 'pass',
                name: PHARMACY_NAMES[i],
                role: 'PHARMACY',
                pharmacy: {
                    create: {
                        name: PHARMACY_NAMES[i],
                        address: `Quartier ${PHARMACY_NAMES[i].split(' ')[1] || 'Centre'}, Dakar`,
                        latitude: lat,
                        longitude: lng,
                        isVerified: true
                    }
                }
            },
            include: { pharmacy: true }
        });
        if (user.pharmacy) pharmacies.push(user.pharmacy);
        console.log(`Created pharmacy: ${user.name}`);
    }

    // 2. Create Drugs
    const drugs = [];
    for (const d of DRUGS_DB) {
        const drug = await prisma.drug.create({ data: { name: d.name, form: d.form, class: d.class } });
        drugs.push({ ...drug, basePrice: d.price });
    }
    console.log(`Created ${drugs.length} drugs.`);

    // 3. Create Stock (Simulation)
    // Each pharmacy has a random subset of drugs
    for (const ph of pharmacies) {
        // Each pharmacy stocks 50-80% of available drugs
        for (const d of drugs) {
            if (Math.random() > 0.3) { // 70% chance to have it
                const qty = Math.floor(Math.random() * 50);
                // Price variation +/- 10%
                const price = Math.floor(d.basePrice * (0.9 + Math.random() * 0.2));

                await prisma.stock.create({
                    data: {
                        pharmacyId: ph.id,
                        drugId: d.id,
                        quantity: qty,
                        price: price
                    }
                });
            }
        }
    }

    console.log('Seeding finished with massive data.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
