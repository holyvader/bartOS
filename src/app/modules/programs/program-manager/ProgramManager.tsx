import { ProgramDefinition } from '@system/definitions/program.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { Button } from '@ui/core/buttons/Button';
import { Grid, GridCol } from '@ui/core/grid/Grid';
import { ActionIcon } from '@ui/core/icons/ActionIcon';
import { IconX } from '@tabler/icons';

export const ProgramManager: ProgramDefinition<[ProgramInstanceService]> = ({
	dependencies
}) => {
	const [programInstanceService] = dependencies ?? [];

	const instances = programInstanceService?.getAll() ?? [];
	return (
		<div>
			{instances.map((it) => (
				<Grid key={it.pid} grow>
					<GridCol span={6}>{it.title}</GridCol>
					<GridCol span={2}>{it.pid}</GridCol>
					<GridCol span={4}>
						{it.userExecutable && (
							<ActionIcon onClick={() => programInstanceService?.close(it.pid)}>
								<IconX />
							</ActionIcon>
						)}
					</GridCol>
				</Grid>
			))}
		</div>
	);
};
