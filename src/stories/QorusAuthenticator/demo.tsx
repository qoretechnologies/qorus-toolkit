import {
  ReqoreColumn,
  ReqoreColumns,
  ReqoreControlGroup,
  ReqoreDropdown,
  ReqoreInput,
  ReqoreMessage,
  ReqorePanel,
} from '@qoretechnologies/reqore';
import { useState } from 'react';
import QorusAuthenticator, { InitEndpoint } from '../../QorusAuthenticator';
import { versions } from '../../QorusValidator';
import { Version } from '../../utils/apiPaths';

export const QorusAuthenticatorDemo = () => {
  const [url, setUrl] = useState<InitEndpoint['url']>('');
  const [id, setID] = useState<InitEndpoint['id']>('');
  const [version, setVersion] = useState<InitEndpoint['version']>('latest');
  const [user, setUser] = useState<InitEndpoint['user']>('');
  const [pass, setPass] = useState<InitEndpoint['pass']>('');

  const [result, setResult] = useState<string | undefined>(undefined);

  const validateLogin = () => {
    return QorusAuthenticator.validateEndpointData({ url, id, version, user, pass }, true);
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        const result = await QorusAuthenticator.initEndpoint({ url, id, version, user, pass });
        setResult(result.authToken);
      } catch (e: any) {
        console.log(e);
        setResult(e.message);
      }
    }
  };

  return (
    <ReqorePanel flat label="Demo" collapsible>
      <ReqoreColumns columnsGap="15px">
        <ReqoreColumn>
          <ReqorePanel
            flat
            minimal
            padded={false}
            bottomActions={[
              {
                label: 'Login',
                disabled: !validateLogin(),
                intent: 'success',
                onClick: () => handleLogin(),
                position: 'right',
              },
            ]}
          >
            <ReqoreControlGroup fluid vertical stack>
              <ReqoreInput fluid placeholder="Endpoint ID" value={id} onChange={(e: any) => setID(e.target.value)} />
              <ReqoreInput placeholder="Endpoint URL" value={url} onChange={(e: any) => setUrl(e.target.value)} />
              <ReqoreDropdown
                items={versions.map((v: string | number | Version) => ({
                  label: v,
                  id: v.toString(),
                  selected: version === v,
                  onClick: () => setVersion(v as Version),
                }))}
                componentProps={{
                  value: `API Version: ${version}`,
                  placeholder: 'Version',
                }}
                component={ReqoreInput}
                label={version}
              />
              <ReqoreInput placeholder="Endpoint User" value={user} onChange={(e: any) => setUser(e.target.value)} />
              <ReqoreInput
                placeholder="Endpoint Pass"
                value={pass}
                onChange={(e: any) => setPass(e.target.value)}
                type="password"
              />
            </ReqoreControlGroup>
          </ReqorePanel>
        </ReqoreColumn>
        <ReqoreColumn flex="0 0 auto">
          {result ? (
            <ReqoreMessage intent="info" title="Authentication token">
              {result}
            </ReqoreMessage>
          ) : (
            <ReqoreMessage title="Authentication token" flat>
              Fill the form and click on the Login button to get the authentication token.
            </ReqoreMessage>
          )}
        </ReqoreColumn>
      </ReqoreColumns>
    </ReqorePanel>
  );
};
