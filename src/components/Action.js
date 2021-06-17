import React from 'react';
import _ from 'lodash';

import { Link, withPrefix, classNames } from '../utils';
import Icon from './Icon';

export default class Action extends React.Component {
    render() {
        const action = _.get(this.props, 'action');
        const url = _.get(action, 'url');
        const label = _.get(action, 'label');
        const style = _.get(action, 'style', 'link');
        const hasIcon = _.get(action, 'has_icon');
        const icon = _.get(action, 'icon');
        const iconPos = _.get(action, 'icon_position', 'right');
        const classes = classNames({
            'btn': style === 'primary' || style === 'secondary' || (hasIcon && icon),
            'btn--primary': style === 'primary',
            'btn--secondary': style === 'secondary',
            'btn--icon': hasIcon && icon && iconPos === 'center',
            'btn--clear': hasIcon && icon && style === 'link'
        });
        const newWindow = _.get(action, 'new_window');
        const noFollow = _.get(action, 'no_follow');
        const attrs = {};
        if (newWindow) {
            attrs.target = '_blank';
        }
        if (newWindow || noFollow) {
            attrs.rel = [(newWindow ? 'noopener' : ''), (noFollow ? 'nofollow' : '')].filter(Boolean).join(' ');
        }

        return (
            <form
                name="contactForm"
                method="POST"
                action="/contact-thanks"
                data-netlify-honeypot="bot-field"
                data-netlify="true"
                id="contact-form"
                className="contact-form"
            >
                <p className="screen-reader-text">
                    <label>Don't fill this out if you're human: <input name="bot-field" /></label>
                </p>
                <p className="form-row">
                    <label htmlFor="contact-form-name" className="form-label">Name</label>
                    <input type="text" name="name" id="contact-form-name" className="form-input" />
                </p>
                <p className="form-row">
                    <label htmlFor="contant-form-email" className="form-label">Email address</label>
                    <input type="email" name="email" id="contant-form-email" className="form-input" />
                </p>
                <p className="form-row">
                    <label htmlFor="contant-form-message" className="form-label">Message</label>
                    <textarea name="message" id="contant-form-message" className="form-textarea" rows="7" />
                </p>
                <input type="hidden" name="form-name" value="contactForm" />
                <p className="form-row form-submit">
                    <button type="submit" className="button">Send Message</button>
                </p>
            </form>
            <Link href={withPrefix(url)} {...attrs} className={classes}>
                {(hasIcon && icon) ? (
                    <React.Fragment>
                        <Icon icon={icon} />
                        <span
                            className={classNames({
                                'order-first': iconPos === 'right',
                                'sr-only': iconPos === 'center'
                            })}
                        >
                            {label}
                        </span>
                    </React.Fragment>
                ) :
                    label
                }
            </Link>
        );
    }
}
