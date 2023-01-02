import {
  ReqoreColumn,
  ReqoreColumns,
  ReqoreControlGroup,
  ReqoreInput,
  ReqoreMessage,
  ReqorePanel,
} from '@qoretechnologies/reqore';
import { useState } from 'react';
import QorusAuthenticator, { AddEndpoint, LoginParams } from '../../QorusAuthenticator';

export const QorusAuthenticatorDemo = () => {
  const [url, setUrl] = useState<AddEndpoint['url']>('');
  const [id, setID] = useState<AddEndpoint['endpointId']>('');
  const [version] = useState<AddEndpoint['version']>('latest');
  const [user, setUser] = useState<LoginParams['user']>('');
  const [pass, setPass] = useState<LoginParams['pass']>('');

  const [result, setResult] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const validateLogin = () => {
    return true;
    // return QorusAuthenticator.validateEndpointData({ url, id, version, user, pass }, true);
  };

  const handleLogin = async () => {
    if (validateLogin()) {
      try {
        QorusAuthenticator.addEndpoint({ url, endpointId: id, version });
        const token = await QorusAuthenticator.login({ user, pass });

        setResult(token || 'noauth');
        setError(undefined);
      } catch (e: any) {
        setResult(undefined);
        setError(e.message);
      }
    }
  };

  return (
    <ReqorePanel flat label="Demo" collapsible isCollapsed>
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
              {/* <ReqoreDropdown
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
              /> */}
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
          {result || error ? (
            <ReqoreMessage
              intent={result ? 'info' : 'danger'}
              title={result ? 'Authentication token' : 'Authentication failure'}
            >
              {result || error}
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
