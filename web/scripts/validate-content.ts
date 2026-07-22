import {
	assertNoEmojiPresentation,
	loadStudies,
} from '../src/lib/research';

const studies = await loadStudies();
for (const study of studies) {
	assertNoEmojiPresentation(study.body, study.fileName);
}
const datasetCount = studies.reduce((total, study) => total + study.datasets.length, 0);
console.log(`Contenido válido: ${studies.length} estudios, ${datasetCount} datasets.`);
