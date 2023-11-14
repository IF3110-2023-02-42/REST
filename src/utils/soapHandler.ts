import axios from "axios"
import converter from "xml-js"

type Header = {
    [key: string]: string | undefined
}

export const soapHandler = async (url: string, method: string, params?: Object) => {
    const headers: Header = {
        'Content-Type': 'text/xml;charset=UTF-8',
        SOAPAction: '#POST',
        'api-key': process.env.SOAP_KEY,
    }

    const xml = buildXMLRequest(method, params)
    const response = await axios.post(url, xml, { headers })
    const data = response.data;

    return parseXML(data, method);
}

const buildXMLRequest = (method: string, params?: Object) => {
    const strParams = buildXMLParams(params)

    return `
      <Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/">
        <Body>
          <${method} xmlns="http://ws/">
            ${strParams}
          </${method}>
        </Body>
      </Envelope>
    `
}

const buildXMLParams = (params?: Object) => {
    if (!params) {
        return ''
    }

    const keyValue = Object.keys(params).map((key) => {
        return `<${key} xmlns="">${params[key as keyof typeof params]}</${key}>`
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
