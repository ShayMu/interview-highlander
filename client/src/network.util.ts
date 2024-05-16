import axios from 'axios';

const serverAddr = 'http://localhost:3001';

export async function apiReq(path:string, data:object, method='GET') {
    return new Promise<any>(resolve=>{
        switch (method) {
            case 'GET': {
                path += '?' + buildQueryParams(data);
                axios.get(serverAddr + path, data).then(res => {
                    resolve(res.data);
                });
            } break;
            case 'POST': {
                axios.post(serverAddr + path, data).then(res => {
                    resolve(res.data);
                });
            } break;
        }
    });
}

function buildQueryParams(params:any) {
    return Object.keys(params)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]))
      .join('&');
  }
  