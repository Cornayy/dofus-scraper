# dofus-scraper
An open-source [Dofus](https://www.dofus.com/en) encyclopedia scraper. Scrape your desired encyclopedia categories and save it to your configured database.

<a href="https://codeclimate.com/github/Cornayy/dofus-scraper/maintainability"><img src="https://api.codeclimate.com/v1/badges/807065bf4ec6dfbff9fb/maintainability" /></a>

## Disclaimer
This project is currently work in progress, feel free to contribute.

## Modes
The 'MODE' environment variable is configurable in the following modes.

```
existing - the scraper will look for existing .json files.
new - the scraper will fetch the newest data.
```

## Usage
Create a .env file in the root of your project, a typical .env should look like this.

```
DB_TYPE=mongodb
HOST=localhost
PORT=27017
DB_NAME=dofus-scraper
MODE=existing
```

However, this project is using [TypeORM](https://typeorm.io/#/), so the use of database is to your preference. When your .env is configured, run the following command to start the scraping.

```
npm run existing
npm run new
```

## TODO
- [x] Equipment
- [x] Sets
- [x] Weapons
- [x] Resources
- [x] Pets
- [x] Ceremonial items
- [x] Mounts
- [x] Consumables
- [x] Bestiary
- [x] Idols

## Less important
- [ ] Professions
- [ ] Classes
- [ ] Sidekicks
- [ ] Haven bags
- [ ] Harnesses






## License
[MIT](LICENSE)



