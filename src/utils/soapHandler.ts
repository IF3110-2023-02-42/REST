import axios from "axios"
import converter from "xml-js"

export const soapHandler = async (url: string, method: string, params?: string[]) => {
    try {
        const response = await axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'text/xml; charset=utf-8',
                'SOAPAction': url + '/' + method,
            },
            data: buildXMLbody(method, params)
        });
        return parseXML(response.data, method);
    } catch (error: any) {
        throw new Error(`SOAP request failed: ${error.message}`);
    }

}

const buildXMLbody = (method: string, params?: string[]) => {
    const strParams = buildXMLParams(params)

    return `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
          <${method} xmlns="http://service/">
            ${strParams}
          </${method}>
        </Body>
      </Envelope>
    `
}

const buildXMLParams = (params?: string[]) => {
    if (!params) {
        return ''
    }

    const keyValue = Object.keys(params).map((key) => {
        return `<arg${key} xmlns="">${params}</arg${key}>`
    })

    return keyValue.join('')
}

const parseXML = (xml: string, method: string) => {
    const json = JSON.parse(converter.xml2json(xml, { compact: true, spaces: 4 }))
    const returnVal = json['S:Envelope']['S:Body']['ns2:' + method + 'Response']['return']

    if (!returnVal) {
        return null
    }

    return buildResponseJSON(returnVal)
}

const buildResponseJSON = (json: JSON) => {
    if (Array.isArray(json)) {
        return json.map((item) => flatten(item))
    }

    return flatten(json)
}

const flatten = (json: JSON): JSON => {
    const response: any = {}

    Object.keys(json).forEach((key) => {
        const value = json[key as keyof typeof json]
        response[key] = value['_text' as keyof typeof value]
    })

    return response
}