import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
  vus: 10, // Subimos a 10 usuarios concurrentes
  duration: '15s',

  // CRITERIOS DE ACEPTACIÓN DUREZA (SLAs de Performance)
  thresholds: {
    // El 95% de las peticiones DEBE responder en menos de 500 milisegundos
    http_req_duration: ['p(95)<500'],
    
    // La tasa de errores no puede superar el 1% (0.01)
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const res = http.get('https://test.k6.io');

  check(res, {
    'Status es 200': (r) => r.status === 200,
  });

  sleep(1);
}