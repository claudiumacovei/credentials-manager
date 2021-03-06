import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './credential.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const CredentialDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const credentialEntity = useAppSelector(state => state.credential.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="credentialDetailsHeading">
          <Translate contentKey="credentialsmanagerApp.credential.detail.title">Credential</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{credentialEntity.id}</dd>
          <dt>
            <span id="profile">
              <Translate contentKey="credentialsmanagerApp.credential.profile">Profile</Translate>
            </span>
          </dt>
          <dd>{credentialEntity.profile}</dd>
          <dt>
            <span id="enabled">
              <Translate contentKey="credentialsmanagerApp.credential.enabled">Enabled</Translate>
            </span>
          </dt>
          <dd>{credentialEntity.enabled ? 'true' : 'false'}</dd>
          <dt>
            <span id="username">
              <Translate contentKey="credentialsmanagerApp.credential.username">Username</Translate>
            </span>
          </dt>
          <dd>{credentialEntity.username}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="credentialsmanagerApp.credential.password">Password</Translate>
            </span>
          </dt>
          <dd>{credentialEntity.password}</dd>
          <dt>
            <Translate contentKey="credentialsmanagerApp.credential.identityProvider">Identity Provider</Translate>
          </dt>
          <dd>{credentialEntity.identityProvider ? credentialEntity.identityProvider.id : ''}</dd>
          <dt>
            <Translate contentKey="credentialsmanagerApp.credential.serviceProviders">Service Providers</Translate>
          </dt>
          <dd>
            {credentialEntity.serviceProviders
              ? credentialEntity.serviceProviders.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {credentialEntity.serviceProviders && i === credentialEntity.serviceProviders.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/credential" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/credential/${credentialEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default CredentialDetail;
