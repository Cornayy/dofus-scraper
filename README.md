# dofus-scraper
Scrape the encyclopedia of [Dofus](https://www.dofus.com/en) and save it to your configured database.

## Usage
Create a .env file in the root of your project, a typical .env should look like this.

```
DB_TYPE=mongodb
HOST=localhost
PORT=27017
DB_NAME=dofus-scraper
```

However, this project is using [TypeORM](https://typeorm.io/#/), so the use of database is to your preference. When your .env is configured, run the following command to start the scraping.

```
npm run start
```

## TODO
- [ ] Equipment
- [ ] Sets
- [ ] Classes
- [ ] Professions
- [ ] Weapons
- [ ] Bestiary
- [ ] Pets
- [ ] Mounts
- [ ] Consumables
- [ ] Resources
- [ ] Ceremonial items
- [ ] Sidekicks
- [ ] Idols
- [ ] Haven bags
- [ ] Harnesses






## License
[MIT](LICENSE)



