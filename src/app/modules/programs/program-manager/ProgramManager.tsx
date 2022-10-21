import { ProgramDefinition } from '@system/definitions/program.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { Button } from '@ui/core/buttons/Button';

export const ProgramManager: ProgramDefinition<[ProgramInstanceService]> = ({
	dependencies
}) => {
	const [programInstanceService] = dependencies ?? [];

	const instances = programInstanceService?.getAll() ?? [];
	return (
		<ul>
			{instances.map((it) => (
				<li key={it.pid}>
					{it.title} [{it.pid}]
					{it.userExecutable && (
						<Button onClick={() => programInstanceService?.close(it.pid)}>
							Quit
						</Button>
					)}
				</li>
			))}
		</ul>
	);
};
