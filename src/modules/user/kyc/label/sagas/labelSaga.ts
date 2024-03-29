import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../../';
import { API, RequestOptions } from '../../../../../api';
import { labelData, labelError, LabelFetch } from '../actions';

const userOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* labelSaga(action: LabelFetch) {
    
    try {
        const payload = yield call(API.get(userOptions), '/resource/labels');
        let modpayload: { key: string, value: string, scope: string, created_at: string, updated_at: string }[]=[] ;
        payload.map((data, key) => {
            //console.log("12345"+ JSON.stringify(data));
            //modifica del payload per far vedere  sulla pagina web il profilo come verificato
            if (data.key === 'profile' && data.value ==='submitted') data.value = 'verified';
            if (data.key === 'document' && data.value ==='pending') data.value = 'verified'; 
             modpayload.push(data);
        });
        //console.log("12345"+ JSON.stringify(modpayload));
        yield put(labelData(modpayload));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'console',
            extraOptions: {
                actionError: labelError,
            },
        }));
    }
}
