const axios = require("axios");

export function main(url: string) {
    return new Promise(function (resolve, reject) {
        url.match(/(?<=u\/)(.+)/g);


        axios.get(url)
            .then(function (response: any) {
                const html: any = response.data;

                const reg: RegExp = /(?<="adaptationSet":)(.+?)}]}/g;
                const strs: any = html.match(reg);
		console.log('11111111111111');
		
                if (strs && strs.length >= 1) {

		    let JSONstr = JSON.parse(strs);
		    let i;
		    for (i of JSONstr.representation){
		    	if(i.qualityType == "BLUE_RAY"){
			    resolve(i.url);
			}
			if(i.qualityType == "SUPER"){
			    resolve(i.url);
			}
		    }

                } else {
                    reject(
                        "KUAISHOU=>No match results:Maybeeeeee the roomid is error,or this room is not open!"
                    );
                }
            })
            .catch(function (error: any) {
                reject(error);
            });
    });
}
