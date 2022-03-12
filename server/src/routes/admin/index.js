import express from 'express';
const geoip = require('geoip-lite');
const axios = require('axios');

const router = express.Router()

router.get('/geoLocationByIP/:ip', (req, res) => {
    const ip = req.params.ip;
    const geo = geoip.lookup(ip);
    return res.json({ success: true, data: geo, message: 'Request successful!' })
});

router.get('/exchangeRates', async (req, res) => {
    let exchangeRates = await axios.get('https://api.coingecko.com/api/v3/exchange_rates');
    let labels = []; let rates = [];

    if (exchangeRates && exchangeRates.data && exchangeRates.data.rates) {

        for (const property in exchangeRates.data.rates) {
            const rate = exchangeRates.data.rates[property];
            labels.push(rate.name);
            rates.push(rate.value);
          }

        exchangeRates = null;
    }

    return res.json({ success: true, data: { labels, rates }, message: 'Request successful!' })
});

router.get('/usPopulation', async (req, res) => {
    let usPopulation = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
    let labels = []; let population = [];

    if (usPopulation && usPopulation.data && usPopulation.data.data) {
        usPopulation = usPopulation.data.data.sort(function (a, b) { return a.Year - b.Year; });
        labels = usPopulation.map(item => item.Year);
        population= usPopulation.map(item => item.Population);

        usPopulation = null;
    }

    return res.json({ success: true, data: { labels, population }, message: 'Request successful!' })
});

export default router;