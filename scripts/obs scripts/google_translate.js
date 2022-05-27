const {Translate} = require('@google-cloud/translate').v2;

const CREDENTIALS = JSON.parse(JSON.stringify({
    "type": "service_account",
    "project_id": "critr-345718",
    "private_key_id": "35b377a2d7263cd2554d71f887d7effa10c5d82f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCRyio7OkFXKyZE\nFGN+OMS1UklWNlm8rfeemZqhDPYI03m2aVFePAgusZIci6zndEcwtGEucBmXSY2j\nNZAsb6Xz5yn6J/abPc/RCetzpF2+sLyvSyJfVH3zGGlriGXfRP5K4uolQJU9i0RO\nJxRRIqyHQS6ftSSNvKbDoR/rIR2jSo/KFTKUdVjcZpNfJIxYkJ707P7fGNKQVWXl\nwF41+zN4CRTc/PvOmVULMSGEIdl4pMUc7mIB0vRy6vdGRmKk2DhZAb7eETibpbrl\nAYVi9rnkWoydT78LZY7Rw5Wwb4OuCM1S5QjLDfiZlI6yQUwBgUu182naEh30tTBR\nKO+rOvVdAgMBAAECggEACVsZtDTUGiG3AjHzw5clioRWF/4DasAYTrmJSpIQHPdj\nTXE7S0qbdNGo8IOHLFBSPD4rKWWAwuxxtjpa/vsIQZuBXmAfq40/L6lNDp4K9RCW\n/0HZWhhMP+Q+aav2a6pcDla7E3puSWWNU92eqGlK/KASe6XOi3kCk7XcnESDCCZJ\nQLq06ld3naTFvl5SM93h3db42Vyi3ASop+iAkjNCMSjPZmC6xtooU3dqViuKRkkT\nSKUWHOHpSBLwblZqe9ogz9ZUytnnDYqEuGHEMz6aQPi6pLj2j4uw6OjZ4Eobhld+\nvR3tJi9oebvG/hNUa+AlDrrgqMH3V2CYlTSeMQsneQKBgQDEvOIDla4XKKbvOMjN\n9sF6YDwCwyFb17COdiaHjNQf9QurasoTQdXZTe6JLMWkBThqf8J6LalUZEtaEEc7\n/FjE0dHlWRPyKTC48tRfww3yp4HcohIM16cceohUGyXAP+nKUgSOuSuz0uQRttoe\n2XuWJ9mGBm+hsN+Uo7NxEu26qQKBgQC9tIBADQN9Oa65+mBlVZ1t2oh+0gbhbjcV\nhK6z4IIY42vqgekQmMJBUAve3jkbHtMNEY+fs2ngs3GFTY/0Qe073Y0nb5zJ0jcG\n6bN+xEZ8fGj0jaeuq9K/yl1XNqsPBHOGBGmVWP2aswszJEHJqykfs/7+GULicXWm\nhjtbCZ5plQKBgEA7fvs2olkzT5VpD76XIsImq1EnjjujJyTMFHZLF3K7mazEt+cj\npoNFO20T7g9IGQxEXCVxxQglmqh0Ch3enMjdzE66D5YPtrWbqpT9ZQ9lezOiwovo\n2Mmmg94Z4vBqrZT9xDko4cjbQNU7wukxjnUO26kzbrz2t3ibHdn8GRvJAoGAQK7t\nE+ncCLTEWPGAMM0ycqSS6fsfEXqNGa82CmtAsM/KmhlVqK0Nf0uV4JYRDqhB+jDE\nsgVw0occ7AD4VqasBz+Rw6KQ6VfeH2NMKqsuBYA+ITSzuiEoKPENRpGDXgl8gnO6\ntIu1XSwzY2q3a9YKnZ64EVf3sFJTdUZLsszi0MkCgYA7BfGEJt7Tp0kKSuzk4UFr\naz15MVCiKFfMaIP1+kl9qh5ylDeunOTNR82DzGI5Eg62AnMDaJl+uIaRDgrHmcdM\nLpeiPJoimYGG0LqMu6H0bU3GHuxqf1u5lIWH5BK/U+g8LD7QXxW+9SAJFllnNfY6\nkwKIlEsxn6lGvyYs3xcpPA==\n-----END PRIVATE KEY-----\n",
    "client_email": "critr-service@critr-345718.iam.gserviceaccount.com",
    "client_id": "107187436815799163876",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/critr-service%40critr-345718.iam.gserviceaccount.com"
}))

const translate = new Translate({
    credentials: CREDENTIALS,
    projectId: CREDENTIALS.project_id
})

const detectLanguage = async (text) => {
    try {
        let response = await translate.detect(text);
        return response[0].language;
    } catch (error) {
        console.log('Error detecting language --> ${error}');
        return 0;
    }
}


/*
detectLanguage('මගේ නම')
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(error);
    });
*/

const translateText = async (text, targetLanguage) => {
    try {
        let [response] = await translate.translate(text, targetLanguage);
        document.getElementById("result").innerHTML = response;
        return response;
    } catch (error) {
        console.log('Error translating text --> ${error}');
        return 0;
    }
};

translateText(value, 'en')
    .then((res) => {
        console.log(res);
        document.getElementById("result").innerHTML = response;
    })
    .catch((err)  => {
        console.log(err);
    });