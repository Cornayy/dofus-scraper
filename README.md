# dofus-scraper
Scrape the encyclopedia of [Dofus](https://www.dofus.com/en) and save it to your configured database.

[![forthebadge](https://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](https://forthebadge.com)
[![forthebadge](https://forthebadge.com/images/badges/built-with-swag.svg)](https://forthebadge.com)

<a href="https://codeclimate.com/github/Cornayy/dofus-scraper/maintainability"><img src="https://api.codeclimate.com/v1/badges/807065bf4ec6dfbff9fb/maintainability" /></a>

## Disclaimer
This project is currently work in progress, feel free to contribute.

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
- [x] Equipment
- [x] Sets
- [x] Weapons
- [ ] Classes
- [ ] Professions
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



