import { loadStudies } from '../src/lib/research';

const studies = await loadStudies();
const datasetCount = studies.reduce((total, study) => total + study.datasets.length, 0);
console.log(`Contenido válido: ${studies.length} estudios, ${datasetCount} datasets.`);
