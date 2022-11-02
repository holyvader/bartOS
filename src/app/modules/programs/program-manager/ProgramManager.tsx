import { ProgramDefinition } from '@system/definitions/program.definition';
import { ProgramInstanceService } from '@services/program-instance/services/program-instance.service';
import { ActionIcon } from '@ui/core/icons/ActionIcon';
import { Table } from '@ui/core/table/Table';
import { IconX } from '@ui/core/icons';
import { StyleWithTheme } from '@ui/ui.definition';
import { useProgramInstanceList } from '../../hooks/useProgramInstanceList';

export const ProgramManager: ProgramDefinition<[ProgramInstanceService]> = ({
	dependencies
}) => {
	const [programInstanceService] = dependencies ?? [];

	const instances = useProgramInstanceList(programInstanceService);

	return (
		<div>
			<Table highlightOnHover>
				<thead>
					<tr>
						<th style={{ width: 40 }}></th>
						<th>Name</th>
						<th>Program ID</th>
						<th style={{ width: 80, textAlign: 'center' }}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{instances.map((it) => (
						<tr key={it.pid}>
							<td>{it.icon ? <it.icon /> : undefined}</td>
							<td>{it.title}</td>
							<td>{it.pid}</td>
							<td style={{ textAlign: 'center' }}>
								{it.userExecutable && (
									<ActionIcon
										style={iconStyle}
										onClick={() => programInstanceService?.close(it.pid)}>
										<IconX />
									</ActionIcon>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

const iconStyle: StyleWithTheme = () => ({ display: 'inline-block ' });
