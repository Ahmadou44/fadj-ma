import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Create a Pharmacy User
    // Phone: 770000000, Password: pass
    const pharmacyUser = await prisma.user.upsert({
        where: { phone: '770000000' },
        update: {},
        create: {
            phone: '770000000',
            password: 'pass', // Plain text for prototype
            name: 'Pharmacie Centrale',
            role: 'PHARMACY',
            pharmacy: {
                create: {
                    name: 'Pharmacie Centrale',
                    address: 'Plateau, Dakar',
                    latitude: 14.6708,
                    longitude: -17.4381,
                    isVerified: true
                }
            }
        },
        include: { pharmacy: true }
    });

    console.log(`Created user: ${pharmacyUser.name} (${pharmacyUser.phone})`);

    if (!pharmacyUser.pharmacy) throw new Error("Pharmacy creation failed");

    // 2. Create Drugs
    const drugsData = [
        { name: 'Doliprane 1000mg', form: 'Comprim', class: 'Antalgique' },
        { name: 'Efferalgan 500mg', form: 'Effervescent', class: 'Antalgique' },
        { name: 'Spasfon', form: 'Comprim', class: 'Antispasmodique' },
        { name: 'Amoxicilline 1g', form: 'Sachet', class: 'Antibiotique' },
        { name: 'Vitamin C Upsa', form: 'Tube', class: 'Vitamine' },
    ];

    for (const d of drugsData) {
        const drug = await prisma.drug.create({
            data: d
        });

        // 3. Add Stock for this Pharmacy
        await prisma.stock.create({
            data: {
                pharmacyId: pharmacyUser.pharmacy.id,
                drugId: drug.id,
                quantity: Math.floor(Math.random() * 100), // Random stock 0-100
                price: Math.floor(Math.random() * 5000) + 500 // Random price 500-5500
            }
        });
        console.log(`Added stock for ${d.name}`);
    }

    console.log('Seeding finished.');
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
