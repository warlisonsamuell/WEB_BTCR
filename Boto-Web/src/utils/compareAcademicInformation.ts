export function compareAcademicInformation(resume: Resume): string {
  if (resume.doutorado === '1') {
    return 'Doutourado';
  } else if (resume.mestrado === '1') {
    return 'Mestrado';
  } else if (resume.posgraduacao === '1') {
    return 'Pós-Graduado';
  } else if (resume.ensinosuperior === '1') {
    return 'Ensino Superior';
  } else if (resume.ensinomedio === '1') {
    return 'Ensino Médio';
  }

  return 'Sem formação';
}
